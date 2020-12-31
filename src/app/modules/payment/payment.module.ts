import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './components/payment-home/payment.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PaymentComponent, CartItemsComponent, ProgressBarComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedComponentsModule,
    AngularMaterialsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
