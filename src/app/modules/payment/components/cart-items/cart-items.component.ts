import { Component, OnInit } from '@angular/core';
import { DealsOffersService } from 'src/app/services/deals-offers/deals-offers.service';
import { IDealsOffers } from 'src/app/shared/interfaces/IDealsOffers';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  offerCardNo = 0;
  toggleFormField = 'promo-code';
  dealsOffers: IDealsOffers[] = [];

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
