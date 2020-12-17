import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from 'src/app/modules/angular-materials/angular-materials.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MobileAppAddComponent } from './mobile-app-add/mobile-app-add.component';

@NgModule({
  declarations: [
    NavBarComponent,
    MobileAppAddComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialsModule
  ],
  exports: [
    NavBarComponent,
    MobileAppAddComponent
  ]
})
export class SharedComponentsModule { }
