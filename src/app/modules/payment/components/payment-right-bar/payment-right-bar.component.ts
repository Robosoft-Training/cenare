import { Component, OnInit } from '@angular/core';
import { DealsOffersService } from 'src/app/services/deals-offers/deals-offers.service';
import { IDealsOffers } from 'src/app/shared/interfaces/IDealsOffers';

@Component({
  selector: 'app-payment-right-bar',
  templateUrl: './payment-right-bar.component.html',
  styleUrls: ['./payment-right-bar.component.scss']
})
export class PaymentRightBarComponent implements OnInit {

  offerCardNo = 0;
  toggleFormField = 'promo-code';
  dealsOffers: IDealsOffers[] = [
    {
      code: "",
      offerPercent: 0,
      offerImagePath: "",
      offerId: 0,
      offerTitle: "0"
    }
  ];

  constructor(
    private dealsOfferService: DealsOffersService
  ) { }

  showOfferCard = (cardNo) => {
    this.offerCardNo = cardNo;
  }

  loadProducts = () => {
    this.dealsOfferService.getDealsOffers().subscribe(
      (dealsOffers: any) => {
        console.log(dealsOffers.resultList);
        this.dealsOffers = dealsOffers.resultList;
      }
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

}
