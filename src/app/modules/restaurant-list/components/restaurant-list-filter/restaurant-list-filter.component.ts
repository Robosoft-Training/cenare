import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list-filter',
  templateUrl: './restaurant-list-filter.component.html',
  styleUrls: ['./restaurant-list-filter.component.scss']
})
export class RestaurantListFilterComponent implements OnInit {

  delivery;
  openNow;
  averageCost;
  minimumCost;
  cuisine;

  constructor() { }

  ngOnInit(): void {
  }

  reset_filter() {
    this.delivery = null;
    this.openNow = null;
    this.averageCost = null;
    this.minimumCost = null;
    this.cuisine = null;
  }

  apply() {

  }
}