import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringSlicePipe } from './string-slice/string-slice.pipe';

@NgModule({
  declarations: [
    StringSlicePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StringSlicePipe
  ]
})
export class PipesModule { }
