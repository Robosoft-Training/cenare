import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringSlicePipe } from './string-slice/string-slice.pipe';
import { FilterMenuPipe } from './filter/filter-menu.pipe';
import { DateFormatePipe } from './date-formate/date-formate.pipe';
import { FilterOffersPipe } from './offers/filter-offers.pipe';

@NgModule({
  declarations: [
    StringSlicePipe,
    FilterMenuPipe,
    DateFormatePipe,
    FilterOffersPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StringSlicePipe,
    FilterMenuPipe,
    DateFormatePipe,
    FilterOffersPipe
  ]
})
export class PipesModule { }
