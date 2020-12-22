import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedLazyModulesRoutingModule } from './shared-lazy-modules-routing.module';
import { SharedLazyModulesComponent } from './shared-lazy-modules.component';
import { NearbyBrandsComponent } from './components/nearby-brands/nearby-brands.component';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';


@NgModule({
  declarations: [SharedLazyModulesComponent, NearbyBrandsComponent],
  imports: [
    CommonModule,
    SharedLazyModulesRoutingModule,
    AngularMaterialsModule,
    SharedComponentsModule
  ]
})
export class SharedLazyModulesModule { }
