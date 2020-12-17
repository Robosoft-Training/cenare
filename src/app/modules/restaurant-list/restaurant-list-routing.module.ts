import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantListFilterComponent } from './components/restaurant-list-filter/restaurant-list-filter.component';
import { RestaurantListOptionsComponent } from './components/restaurant-list-options/restaurant-list-options.component';

import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantNearbyBrandsComponent } from './components/restaurant-nearby-brands/restaurant-nearby-brands.component';

const routes: Routes = [
  { path: '', component: RestaurantListComponent },
  { path: 'restaurant-filter', component: RestaurantListFilterComponent },
  { path: 'near-by', component: RestaurantNearbyBrandsComponent },
  { path: 'options', component: RestaurantListOptionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantListRoutingModule { }
