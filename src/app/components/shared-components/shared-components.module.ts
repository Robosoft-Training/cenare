import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from 'src/app/modules/angular-materials/angular-materials.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialsModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class SharedComponentsModule { }
