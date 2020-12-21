import { Component, OnInit } from '@angular/core';

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
  }

  constructor() { }

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
    // Apply filter from service
    // console.log(this.filterData);
  }
}