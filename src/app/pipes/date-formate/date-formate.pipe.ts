import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormate'
})
export class DateFormatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const date = value;
    return new Date(date).toLocaleString('en-in', { month: 'long' }) + ' ' + this.getDatae(new Date(date).getDate()) + ', ' + new Date(date).getFullYear();
  }

  getDatae = (date) => {
    if (date < 10) {
      return '0' + date;
    }
    return date;
  }
}
