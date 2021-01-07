import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NearbyBrandsComponent } from './components/nearby-brands/nearby-brands.component';

const routes: Routes = [
  { path: '', component: NearbyBrandsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedLazyModulesRoutingModule { }
