import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';
import { SortingService } from 'src/app/services/sorting/sorting.service';

@Component({
  selector: 'app-restaurant-list-options',
  templateUrl: './restaurant-list-options.component.html',
  styleUrls: ['./restaurant-list-options.component.scss']
})
export class RestaurantListOptionsComponent implements OnInit {

  restaurantDataList: any[] = [];
  deatilsArray: any;
  currentTime: any;
  sortType = 'rating_high_low';
  arrayLength = 0;
  imageplaceHolder = '../assets/images/Resturant Image_placeholder.png';

  showMoreOptionsCount = 5;
  isExistMoreItems = true;
  isLoading = true;

  constructor(
    private restaurantListService: RestaurantListService,
    private sortingService: SortingService,
    private menuListService: MenuListService,
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

  // convertToarray = (restaurantDataList) => {
  //   this.deatilsArray = [];
  //   for (let i in restaurantDataList) {
  //     this.deatilsArray.push(restaurantDataList[i]);
  //     // console.log(this.deatilsArray);
  //   }
  // }

  loadData = () => {
    this.isLoading = true;
    this.restaurantListService.currentretaurantDataListSource.subscribe(
      (restaurantDataList: any) => {
        // this.convertToarray( restaurantDataList );
        console.log(restaurantDataList.resultList);
        this.deatilsArray = restaurantDataList.resultList;
        this.arrayLength = this.deatilsArray.length;
        this.isLoading = false;
      }
    );
    this.restaurantListService.loadRestaurants();
    const currentDate = new Date();
    this.currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

    // this.popularProductsService.currentnearbyBrandsDataListSource.subscribe(
    //   (nearByPopularDataList) => {
    //     // console.log(nearByPopularDataList);
    //   }
    // );
    // this.popularProductsService.loadNearbyBrands();
  }

  goToMenuScreen = (restaurantID) => {
    this.menuListService.getRestaurantMenuItems(restaurantID).subscribe(
      (msg) => {
        this.router.navigate(['/menu-list']);
      },
      err => {
        alert('something went wrong');
      }
    );
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
