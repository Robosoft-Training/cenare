import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuListRoutingModule } from './menu-list-routing.module';
import { MenuListComponent } from './components/menu-list-home/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReviewsRatingsComponent } from './components/reviews-ratings/reviews-ratings.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';
import { MenuHomeComponent } from './menu-home.component';


@NgModule({
  declarations: [MenuListComponent, MenuComponent, OverviewComponent, ReviewsRatingsComponent, GalleryComponent, MenuHomeComponent],
  imports: [
    CommonModule,
    MenuListRoutingModule,
    SharedComponentsModule,
    AngularMaterialsModule
  ],
  bootstrap: [MenuHomeComponent]
})
export class MenuListModule { }
