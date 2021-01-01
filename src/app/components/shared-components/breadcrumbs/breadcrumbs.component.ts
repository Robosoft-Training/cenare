import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { RestaurantOverviewService } from 'src/app/services/resraurant-details/restaurant-overview/restaurant-overview.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() pageName;

  searchName = '';
  storageData: any;
  initialItems = [
    'Home'
  ];

  breadCrumbList: any = [];

  constructor(
    private reataurantListService: RestaurantListService,
    private localstorageSerivice: LocalStorageService,
    private resaurantOverviewService: RestaurantOverviewService
  ) { }

  initializeList = () => {
    this.breadCrumbList = [];
    this.breadCrumbList[0] = 'Home';
    this.breadCrumbList[1] = this.storageData.locationName;
    this.breadCrumbList[2] = 'Explore';
  }

  setData = () => {
    if (this.pageName === 'restaurant-list') {
      this.initializeList();
      this.breadCrumbList[3] = 'Great ' + this.storageData.searchName;
      // console.log(this.breadCrumbList);
    }

    if (this.pageName === 'restaurant-details') {
      this.initializeList();
      this.breadCrumbList[3] = 'Great ' + this.storageData.searchName;
      this.breadCrumbList[4] = 'Chicke dinner';
    }

    if (this.pageName === 'all-brands') {
      this.initializeList();
      this.breadCrumbList[3] = 'All Brands';
      // this.breadCrumbList[4] = 'Chicke dinner';
    }

    if (this.pageName === 'menu-home') {
      this.initializeList();
      this.breadCrumbList[3] = 'Great ' + this.storageData.searchName;
      this.breadCrumbList[4] = 'The Gufha Restaurant';
    }

    if (this.pageName === 'cart-page') {
      this.initializeList();
      this.breadCrumbList[3] = 'Great ' + this.storageData.searchName;
      this.breadCrumbList[4] = 'My Cart';
    }
  }

  ngOnInit(): void {
    this.reataurantListService.currentDataList.subscribe(
      (currentDataList: any) => {
        this.breadCrumbList[1] = currentDataList.locationName;
        this.breadCrumbList[3] = 'Great ' + currentDataList.searchName;
        // console.log(currentDataList);
      }
    );
    this.resaurantOverviewService.restaurantName.subscribe(
      (restaurantName: any) => {
        this.breadCrumbList[4] = restaurantName;
      }
    );
    this.storageData = this.localstorageSerivice.getUserSearchDetails();
    this.storageData = JSON.parse(this.storageData);
    this.setData();
  }
}
