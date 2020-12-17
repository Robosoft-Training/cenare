import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from 'src/app/modules/angular-materials/angular-materials.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MobileAppAddComponent } from './mobile-app-add/mobile-app-add.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavBarComponent,
    MobileAppAddComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    MobileAppAddComponent
  ]
})
export class SharedComponentsModule { }
