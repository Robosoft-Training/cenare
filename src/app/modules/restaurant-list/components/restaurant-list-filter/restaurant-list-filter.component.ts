import { Component, OnInit } from '@angular/core';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-restaurant-list-filter',
  templateUrl: './restaurant-list-filter.component.html',
  styleUrls: ['./restaurant-list-filter.component.scss']
})
export class RestaurantListFilterComponent implements OnInit {

  filterData = {
    delivery: null,
    openNow: null,
    averageCost: null,
    minimumCost: null,
    cuisine: null
  };

  constructor(
    private reataurantService: RestaurantListService
  ) { }

  ngOnInit(): void {
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
