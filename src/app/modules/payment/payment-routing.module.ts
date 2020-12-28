import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartItemsComponent } from './components/cart-items/cart-items.component';

import { PaymentComponent } from './components/payment-home/payment.component';

const routes: Routes = [
  { path: '', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
