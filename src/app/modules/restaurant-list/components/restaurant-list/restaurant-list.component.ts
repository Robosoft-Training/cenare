import { Component, OnInit } from '@angular/core';
import { PopularProductsService } from 'src/app/services/popular-products/popular-products.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  constructor(
    private restaurantListService: RestaurantListService,
    private popularProductsService: PopularProductsService
  ) { }

  loadData = () => {
    this.restaurantListService.currentretaurantDataListSource.subscribe(
      (retaurantDataList) => {
        // console.log(retaurantDataList);
      }
    );
    this.restaurantListService.loadRestaurants();

    this.popularProductsService.currentnearbyBrandsDataListSource.subscribe(
      (retaurantDataList) => {
        // console.log(retaurantDataList);
      }
    );
    this.popularProductsService.loadNearbyBrands();
  }

  ngOnInit(): void {
    this.loadData();
  }
}
