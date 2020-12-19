import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from 'src/app/modules/angular-materials/angular-materials.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MobileAppAddComponent } from './mobile-app-add/mobile-app-add.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowToOrderComponent } from './how-to-order/how-to-order.component';


@NgModule({
  declarations: [
    NavBarComponent,
    MobileAppAddComponent,
    LoginComponent,
    HowToOrderComponent,
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
  ]
})
export class SharedComponentsModule { }
