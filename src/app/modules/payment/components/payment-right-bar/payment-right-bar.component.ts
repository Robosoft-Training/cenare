import { Component, Input, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address-details/address.service';
import { DealsOffersService } from 'src/app/services/deals-offers/deals-offers.service';
import { CartService } from 'src/app/services/order-details/cart.service';

@Component({
  selector: 'app-payment-right-bar',
  templateUrl: './payment-right-bar.component.html',
  styleUrls: ['./payment-right-bar.component.scss']
})
export class PaymentRightBarComponent implements OnInit {

  @Input() totalAmmount: any;
  @Input() discountAmmount: any;
  @Input() toPayAmmount: any
  @Input() restaurantId: any;
  @Input() orderId: any;

  isOpen = false;
  adress = "";
  clickedCount = 0;
  clickedOffer: any = null;
  monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  offerCardNo = 0;
  toggleFormField = 'promo-code';
  dealsOffers: any[] = [
    {
      offer: {
        code: "",
        offerPercent: 0,
        offerImagePath: "",
        offerId: 0,
        offerTitle: "0"
      },
      start_date: [],
      end_date: []
    }
  ];

  popoverData = {
    offer: {
      code: "",
      offerPercent: 0,
      offerImagePath: "",
      offerId: 0,
      offerTitle: "0"
    },
    start_date: [],
    end_date: []
  }

  outlets: any = [
    {
      outletName: "Dubai Outlet Mall",
      outletAddress: "Food Court, Level 1, Dubai Outlet Mall, Dubai"
    }
  ]

  constructor(
    private offerService: DealsOffersService,
    private adressService: AddressService,
    private cartService: CartService,
  ) { }

  loadAmount = (orderId) => {
    this.cartService.getAmmountDetails(orderId).subscribe(
      (data: any) => {
        this.totalAmmount = data.total_amount;
        this.toPayAmmount = this.totalAmmount - data.discount;
        this.discountAmmount = data.discount;
      }
    )
  }

  applyOfferCode = (code, orderId) => {
    this.offerService.applyOfferCode(code, orderId).subscribe(
      msg => {
        this.loadAmount(orderId);
      }
    );
  }

  displayPopover = (count) => {
    this.popoverData = this.dealsOffers[count];
  }

  displayImage(count) {
    this.clickedCount = count;
    this.popoverData = this.dealsOffers[count];
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = !this.isOpen;
  }

  showOfferCard = (cardNo) => {
    console.log(cardNo);
    this.offerCardNo = cardNo;
  }

  loadProducts = () => {
    setTimeout(() => {
      this.offerService.getValiedDealsOffers(this.orderId).subscribe(
        (dealsOffers: any) => {
          console.log(dealsOffers.resultList);
          this.dealsOffers = dealsOffers.resultList;
        }
      );
    }, 1500);
  }

  leftArrow(co) {
    this.clickedCount += co;
    console.log(this.clickedCount, co);
    if (this.clickedCount <= 0) {
      $("#left").addClass('left');
      $("#left").removeClass('leftArrow');
    }
    else if (this.clickedCount === this.dealsOffers.length - 1) {
      $("#right").addClass('right');
      $("#right").removeClass('rightArrow');
    }
    else {
      this.clickedOffer = this.dealsOffers[this.clickedCount];
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      this.displayPopover(this.clickedCount);
    }
  }

  ngOnInit(): void {
    console.log(this.restaurantId);
    this.loadProducts();

    this.adressService.getPrimaryAddress().subscribe(
      data => {
        if (data) {
          this.adress = data.area + ", " + data.city;
        }
      }
    );
  }

}
