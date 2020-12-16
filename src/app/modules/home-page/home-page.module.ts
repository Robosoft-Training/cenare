import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomePageHeaderComponent } from './components/home-page-header/home-page-header.component';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePopularBrandsComponent } from './components/home-popular-brands/home-popular-brands.component';
import { HomeDealsOffersComponent } from './components/home-deals-offers/home-deals-offers.component';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';


@NgModule({
  declarations: [HomePageComponent, HomePageHeaderComponent, HomePopularBrandsComponent, HomeDealsOffersComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class HomePageModule { }
