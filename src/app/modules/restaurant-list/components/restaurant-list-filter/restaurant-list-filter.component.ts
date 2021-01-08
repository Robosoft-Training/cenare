import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-restaurant-list-filter',
  templateUrl: './restaurant-list-filter.component.html',
  styleUrls: ['./restaurant-list-filter.component.scss']
})
export class RestaurantListFilterComponent implements OnInit {

  userSearchDetails: any;
  locationName = '';
  searchName = '';

  filterData = {
    delivery: null,
    openNow: null,
    averageCost: null,
    minimumCost: null,
    cuisine: null
  };

  constructor(
    private reataurantService: RestaurantListService,
    private reataurantListService: RestaurantListService,
    private localstorageSerivice: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.reataurantListService.currentDataList.subscribe(
      (currentDataList: any) => {
        this.locationName  = currentDataList.locationName;
        this.searchName = currentDataList.searchName;
      }
    );
    this.userSearchDetails = this.localstorageSerivice.getUserSearchDetails();
    const searchDetails = { ...JSON.parse(this.userSearchDetails) };
    this.locationName = searchDetails.locationName;
    this.searchName = searchDetails.searchName;
  }

  reset_filter() {
    this.filterData.delivery = null;
    this.filterData.openNow = null;
    this.filterData.averageCost = null;
    this.filterData.minimumCost = null;
    this.filterData.cuisine = null;
  }

  apply() {
    if (
      this.filterData.delivery &&
      this.filterData.averageCost &&
      this.filterData.minimumCost
    ) {
      this.reataurantService.filterRetaurants(this.filterData).subscribe(
        msg => {}
      );
    }
  }
}
