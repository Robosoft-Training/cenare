import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantListRoutingModule } from './restaurant-list-routing.module';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantListFilterComponent } from './components/restaurant-list-filter/restaurant-list-filter.component';
import { RestaurantNearbyBrandsComponent } from './components/restaurant-nearby-brands/restaurant-nearby-brands.component';
import { RestaurantListOptionsComponent } from './components/restaurant-list-options/restaurant-list-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RestaurantListComponent, RestaurantListFilterComponent, RestaurantNearbyBrandsComponent, RestaurantListOptionsComponent],
  imports: [
    CommonModule,
    RestaurantListRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestaurantListModule { }
