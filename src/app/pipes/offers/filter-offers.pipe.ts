import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOffers'
})
export class FilterOffersPipe implements PipeTransform {

  transform(items: any, ...filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.offerTitle.toLowerCase().indexOf(filter[0].toLowerCase()) !== -1);
  }

}
