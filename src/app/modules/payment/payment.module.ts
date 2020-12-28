import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './components/payment-home/payment.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';


@NgModule({
  declarations: [PaymentComponent, CartItemsComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedComponentsModule,
    AngularMaterialsModule
  ]
})
export class PaymentModule { }
