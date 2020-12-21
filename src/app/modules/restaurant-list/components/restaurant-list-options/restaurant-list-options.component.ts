import { Component, OnInit } from '@angular/core';
import { PopularProductsService } from 'src/app/services/popular-products/popular-products.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';
import { SortingService } from 'src/app/services/sorting/sorting.service';

@Component({
  selector: 'app-restaurant-list-options',
  templateUrl: './restaurant-list-options.component.html',
  styleUrls: ['./restaurant-list-options.component.scss']
})
export class RestaurantListOptionsComponent implements OnInit {

  restaurantDataList: any[] = [];
  deatilsArray: any[] = [];
  currentTime: any;
  sortType = 'rating_high_low';

  constructor(
    private restaurantListService: RestaurantListService,
    private popularProductsService: PopularProductsService,
    private sortingService: SortingService
  ) { }

  compareDate = (openTime, closeTime) => {
    let currentDate = new Date();
    let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let time_1 = Date.parse(`01/01/1998 ${openTime}`) <= Date.parse(`01/01/1998 ${currentTime}`);
    let time_2 = Date.parse(`01/01/1998 ${closeTime}`) > Date.parse(`01/01/1998 ${currentTime}`)
    // console.log(openTime, closeTime, currentTime);
    return (time_1 && time_2);
  }

  convertToarray = (restaurantDataList) => {
    this.deatilsArray = [];
    for (var i in restaurantDataList) {
      this.deatilsArray.push(restaurantDataList[i]);
      // console.log(this.deatilsArray);
    }

    let currentDate = new Date();
    this.currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

  }

  loadData = () => {
    this.restaurantListService.currentretaurantDataListSource.subscribe(
      (restaurantDataList: any) => {
        this.convertToarray(restaurantDataList);;
      }
    );

    this.restaurantListService.loadRestaurants();

    // this.popularProductsService.currentnearbyBrandsDataListSource.subscribe(
    //   (nearByPopularDataList) => {
    //     // console.log(nearByPopularDataList);
    //   }
    // );
    // this.popularProductsService.loadNearbyBrands();
  }

  goToMenuScreen = (restaurantID) => {
    console.log(restaurantID);
  }

  sortData = (sortType) => {
    this.sortType = sortType;
    this.deatilsArray = this.sortingService.sortingFloat(this.deatilsArray, sortType);
  }

  sortinAlphabetically = (sortType) => {
    this.deatilsArray = this.sortingService.sortinAlphabetically(this.deatilsArray, sortType);
  }

  ngOnInit(): void {
    this.loadData();

  }
}
