import { Component, OnInit } from '@angular/core';
import { DealsOffersService } from 'src/app/services/deals-offers/deals-offers.service';
import { PopularProductsService } from 'src/app/services/popular-products/popular-products.service';
import { IDealsOffers } from 'src/app/shared/interfaces/IDealsOffers';

@Component({
  selector: 'app-home-deals-offers',
  templateUrl: './home-deals-offers.component.html',
  styleUrls: ['./home-deals-offers.component.scss']
})
export class HomeDealsOffersComponent implements OnInit {

  dealsOffers: IDealsOffers[] = [];
  isLoading = true;
  isErrorLoading = false;

  constructor(
    private dealsOfferService: DealsOffersService
  ) { }

  getDetails = (offerId: any) => {
    // Go to offer details
    console.log('Details', offerId);
  }

  getAllOffersList = () => {
    // Go to offer details
    console.log('All offers');
  }

  loadProducts = () => {
    this.isErrorLoading = false;
    this.dealsOfferService.getDealsOffers().subscribe(
      (products: IDealsOffers[]) => {
        console.log(products);
        this.dealsOffers = products;
        this.isLoading = false;
      },
      err => {
        this.isErrorLoading = true;
      },
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

}
