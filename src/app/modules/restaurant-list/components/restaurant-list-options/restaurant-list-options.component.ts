import { Component, OnInit } from '@angular/core';
import { PopularProductsService } from 'src/app/services/popular-products/popular-products.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-restaurant-list-options',
  templateUrl: './restaurant-list-options.component.html',
  styleUrls: ['./restaurant-list-options.component.scss']
})
export class RestaurantListOptionsComponent implements OnInit {

  restaurantDataList: any[] = [];
  deatilsArray: any[] = [];
  currentTime: any;

  constructor(
    private restaurantListService: RestaurantListService,
    private popularProductsService: PopularProductsService
  ) { }

  compateDate = () => {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    var prem = Date.parse('01/01/2011 20:49:45') > Date.parse(`01/01/2011 ${time}`)
    console.log(prem, time);
  }

  convertToarray = (restaurantDataList) => {
    this.deatilsArray = [];
    for(var i in restaurantDataList){
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
    this.deatilsArray.sort(function(a, b) {
      return parseFloat(b.rating)-parseFloat(a.rating);
    });
    this.deatilsArray.sort((a, b) => parseFloat(b.rating)-parseFloat(a.rating));
  }

  ngOnInit(): void {
    this.loadData();
    
  }
}
