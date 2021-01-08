import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';
import { SortingService } from 'src/app/services/sorting/sorting.service';
import { IRestaurant } from 'src/app/shared/interfaces/IRestaurant_List';

@Component({
  selector: 'app-restaurant-list-options',
  templateUrl: './restaurant-list-options.component.html',
  styleUrls: ['./restaurant-list-options.component.scss']
})
export class RestaurantListOptionsComponent implements OnInit {

  deatilsArray: IRestaurant[] = [
    {
      restaurant: {
        restaurant_id: 0,
        restaurant_name: '',
        restaurant_city: '',
        restaurant_address: '',
        open_time: [],
        close_time: [],
        avg_delivery_time: 0,
        min_order_cost: 0,
        avg_order_cost: 0,
        menu_image: '',
        restaurant_image: ''
      },
      rating: 0,
      cuisines: []
    }
  ];

  currentTime: any;
  sortType = 'random';
  arrayLength = 0;
  imageplaceHolder = '../assets/images/rest_placeholder.png';

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
    return (time1 && time2);
  }

  loadData = () => {
    this.isLoading = true;

    this.restaurantListService.currentretaurantDataListSource.subscribe(
      (restaurantDataList: any) => {
        this.deatilsArray = restaurantDataList.resultList;
        this.arrayLength = this.deatilsArray?.length;
        this.isLoading = false;
        this.sortType = 'random';
      }
    );

    this.restaurantListService.loadRestaurants().subscribe(
      (restaurantDataList: any) => {
        this.deatilsArray = restaurantDataList.resultList;
        this.arrayLength = this.deatilsArray.length;
        this.isLoading = false;
        // this.sortData('rating_high_low');
      }
    );
    const currentDate = new Date();
    this.currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
  }

  goToMenuScreen = (restaurantID) => {
    this.menuListService.getRestaurantMenuItems(restaurantID).subscribe(
      (msg) => {
      },
      err => {
        
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
