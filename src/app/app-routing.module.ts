import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { empty } from 'rxjs';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { EmptyScenarioComponent } from './components/shared-components/empty-scenario/empty-scenario.component';
import { OrderTrackComponent } from './components/shared-components/order-track/order-track.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'about', component: AboutComponent },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'contact', component: ContactComponent },
  {path:'error', component:ErrorPageComponent},
  {path:'empty',component:EmptyScenarioComponent},
  {path:'status', component:OrderTrackComponent},
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
  { path: 'user-profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule) },
  { path: 'payment', loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule) },

  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
