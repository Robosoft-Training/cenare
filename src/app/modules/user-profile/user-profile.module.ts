import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddressComponent} from './components/address/address.component';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  declarations: [UserProfileComponent, OrdersComponent, AddressComponent, EditUserProfileComponent, PaymentMethodsComponent, ReviewsComponent, GalleryComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    AngularMaterialsModule,
    SharedComponentsModule
  ]
})
export class UserProfileModule { }
