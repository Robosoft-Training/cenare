import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantListRoutingModule } from './restaurant-list-routing.module';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantListFilterComponent } from './components/restaurant-list-filter/restaurant-list-filter.component';
import { RestaurantNearbyBrandsComponent } from './components/restaurant-nearby-brands/restaurant-nearby-brands.component';
import { RestaurantListOptionsComponent } from './components/restaurant-list-options/restaurant-list-options.component';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RestaurantListComponent, RestaurantListFilterComponent, RestaurantNearbyBrandsComponent, RestaurantListOptionsComponent],
  imports: [
    CommonModule,
    RestaurantListRoutingModule,
    SharedComponentsModule,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestaurantListModule { }
