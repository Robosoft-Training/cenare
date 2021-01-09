import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringSlicePipe } from './string-slice/string-slice.pipe';
import { FilterMenuPipe } from './filter/filter-menu.pipe';
import { DateFormatePipe } from './date-formate/date-formate.pipe';

@NgModule({
  declarations: [
    StringSlicePipe,
    FilterMenuPipe,
    DateFormatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StringSlicePipe,
    FilterMenuPipe,
    DateFormatePipe
  ]
})
export class PipesModule { }
