import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { OrderTrackComponent } from './components/shared-components/order-track/order-track.component';
import { AllOffersComponent } from './components/shared-components/all-offers/all-offers/all-offers.component';
import { OfferComponent } from './components/shared-components/all-offers/offers/offers.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'about', component: AboutComponent },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'status/:id', component: OrderTrackComponent },
  { path: 'offers/:id', component: OfferComponent },
  { path: 'all-offers', component: AllOffersComponent },
  { path: 'error', component: ErrorPageComponent },
  {
    path: 'restaurant-list',
    loadChildren: () => import('./modules/restaurant-list/restaurant-list.module').then(m => m.RestaurantListModule)
  },
  {
    path: 'shared-modules',
    loadChildren: () => import('./modules/shared-lazy-modules/shared-lazy-modules.module').then(m => m.SharedLazyModulesModule)
  },
  {
    path: 'menu-list/:id',
    loadChildren: () => import('./modules/menu-list/menu-list.module').then(m => m.MenuListModule)
  },
  { path: 'user-profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule), canActivate: [AuthGuard] },
  { path: 'payment', loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule), canActivate: [AuthGuard] },

  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
