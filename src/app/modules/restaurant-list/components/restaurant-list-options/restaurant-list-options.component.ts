import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  showMoreOptionsCount = 5;
  isExistMoreItems = true;

  constructor(
    private restaurantListService: RestaurantListService,
    private sortingService: SortingService,
    private router: Router
  ) { }

  showMoreOptions = () => {
    if (this.deatilsArray.length >= this.showMoreOptionsCount) {
      this.showMoreOptionsCount += 1;
    }
    else {
      console.log(this.showMoreOptionsCount);
      this.isExistMoreItems = false;
    }
  }

  compareDate = (openTime, closeTime) => {
    const currentDate = new Date();
    const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
    const time1 = Date.parse(`01/01/1998 ${openTime}`) <= Date.parse(`01/01/1998 ${currentTime}`);
    const time2 = Date.parse(`01/01/1998 ${closeTime}`) > Date.parse(`01/01/1998 ${currentTime}`);
    // console.log(openTime, closeTime, currentTime);
    return (time1 && time2);
  }

  convertToarray = (restaurantDataList) => {
    this.deatilsArray = [];
    for (let i in restaurantDataList) {
      this.deatilsArray.push(restaurantDataList[i]);
      // console.log(this.deatilsArray);
    }

    const currentDate = new Date();
    this.currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
  }

  loadData = () => {
    this.restaurantListService.currentretaurantDataListSource.subscribe(
      (restaurantDataList: any) => {
        this.convertToarray( restaurantDataList );
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
    this.router.navigate(['/menu-list']);
  }

  sortData = (sortType) => {
    this.sortType = sortType;
    this.deatilsArray = this.sortingService.sortingFloat(this.deatilsArray, sortType);
  }

  sortinAlphabetically = (sortType) => {
    this.deatilsArray = this.sortingService.sortingAlphabetically(this.deatilsArray, sortType);
  }

  ngOnInit(): void {
    this.loadData();
  }
}
