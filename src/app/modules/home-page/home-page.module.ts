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
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { PICK_FORMATS } from '../../shared/date-picker-formate';
import { DatePickerService } from '../../services/date-picker/date-picker.service';

@NgModule({
  declarations: [HomePageComponent, HomePageHeaderComponent, HomePopularBrandsComponent, HomeDealsOffersComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  providers: [
    { provide: DateAdapter, useClass: DatePickerService },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ],
})
export class HomePageModule { }
