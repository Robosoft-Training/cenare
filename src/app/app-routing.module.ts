import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  { path: 'home-page', loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: '', pathMatch: 'full', redirectTo: '/home-page' },
  { path: 'about', component: AboutComponent },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'contact', component: ContactComponent },
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
  { path: 'payment', loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
