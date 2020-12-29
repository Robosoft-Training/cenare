import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMenu'
})
export class FilterMenuPipe implements PipeTransform {

  
transform(items: any[], filter: Object): any {
  if (!items || !filter) {
      return items;
  }
  return items.filter(item => item.menu.item_name.indexOf(filter) !== -1);
}
}
