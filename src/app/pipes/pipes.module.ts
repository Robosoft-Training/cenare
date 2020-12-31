import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringSlicePipe } from './string-slice/string-slice.pipe';
import { FilterMenuPipe } from './filter/filter-menu.pipe';

@NgModule({
  declarations: [
    StringSlicePipe,
    FilterMenuPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StringSlicePipe,
    FilterMenuPipe
  ]
})
export class PipesModule { }
