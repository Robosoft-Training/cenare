import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';

import { MenuListComponent } from './components/menu-list-home/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReviewsRatingsComponent } from './components/reviews-ratings/reviews-ratings.component';
import { MenuHomeComponent } from './menu-home.component';

const routes: Routes = [
  { path: 'menu-list-component', component: MenuListComponent },
  { path: 'menu', component: MenuComponent, outlet: 'example' },
  { path: 'overview', component: OverviewComponent },
  { path: 'reviews-ratings', component: ReviewsRatingsComponent },
  { path: 'gallery', component: GalleryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuListRoutingModule { }
