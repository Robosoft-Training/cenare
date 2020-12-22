import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';

import { MenuListComponent } from './components/menu-list-home/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReviewsRatingsComponent } from './components/reviews-ratings/reviews-ratings.component';

const routes: Routes = [
  { path: '', component: MenuListComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'reviews-ratings', component: ReviewsRatingsComponent },
  { path: 'gallery', component: GalleryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuListRoutingModule { }
