import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomePageHeaderComponent } from './components/home-page-header/home-page-header.component';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomePageComponent, HomePageHeaderComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomePageModule { }
