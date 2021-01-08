import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from 'src/app/modules/angular-materials/angular-materials.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MobileAppAddComponent } from './mobile-app-add/mobile-app-add.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowToOrderComponent } from './how-to-order/how-to-order.component';
import { TopSearchBarComponent } from './top-search-bar/top-search-bar.component';
import { PICK_FORMATS } from '../../shared/date-picker-formate';
import { DatePickerService } from '../../services/date-picker/date-picker.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CustomScrollDirective } from './custom-scroll-directive';
import { LoadingComponent } from './loading/loading.component';
import { LocationComponent } from './empty-scenario/location/location.component';
import { ConnectionComponent } from './empty-scenario/connection/connection.component';
import { OffersComponent } from './empty-scenario/offers/offers.component';
import { OrderTrackComponent } from './order-track/order-track.component';


@NgModule({
  declarations: [
    NavBarComponent,
    MobileAppAddComponent,
    LoginComponent,
    HowToOrderComponent,
    TopSearchBarComponent,
    BreadcrumbsComponent,
    CustomScrollDirective,
    LoadingComponent,
    LocationComponent,
    ConnectionComponent,
    OffersComponent,
    OrderTrackComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavBarComponent,
    MobileAppAddComponent,
    HowToOrderComponent,
    TopSearchBarComponent,
    BreadcrumbsComponent,
    CustomScrollDirective,
    LoadingComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: DatePickerService },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class SharedComponentsModule { }
