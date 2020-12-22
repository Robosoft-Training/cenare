import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NearbyBrandsComponent } from './components/nearby-brands/nearby-brands.component';

import { SharedLazyModulesComponent } from './shared-lazy-modules.component';

const routes: Routes = [
  { path: '', component: SharedLazyModulesComponent },
  { path: 'nearby-brands', component: NearbyBrandsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedLazyModulesRoutingModule { }
