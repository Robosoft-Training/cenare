import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService extends NativeDateAdapter{

  format(date: Date, displayFormat: any): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd  MMMM, yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }

}
