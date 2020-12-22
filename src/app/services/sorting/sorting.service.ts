import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  sortingFloat = (deatilsArray, sortType) => {

    deatilsArray.sort(
      (a, b) => {
        return parseFloat(b.rating) - parseFloat(a.rating);
      }
    );

    if (sortType === 'rating_high_low') {
      deatilsArray.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      return deatilsArray;
    }
    else if (sortType === 'rating_low_high') {
      deatilsArray.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
      return deatilsArray;
    }

    if (sortType === 'avg_high_low') {
      deatilsArray.sort((a, b) => parseFloat(b.avg_order_cost) - parseFloat(a.avg_order_cost));
      return deatilsArray;
    }
    else if (sortType === 'avg_low_high') {
      deatilsArray.sort((a, b) => parseFloat(a.avg_order_cost) - parseFloat(b.avg_order_cost));
      return deatilsArray;
    }
  }

  sortinAlphabetically = (deatilsArray, sortType) => {

    const compareStrings = (a, b): any => {
      console.log(a);
      a = a.toLowerCase();
      b = b.toLowerCase();
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    };

    if (sortType === 'a-z') {
      deatilsArray.sort(
        (a, b) => {
          return compareStrings(a.restaurant_name, b.restaurant_name);
        }
      );
    }
    else if (sortType === 'z-a') {
      deatilsArray.sort(
        (a, b) => {
          return compareStrings(b.restaurant_name, a.restaurant_name);
        }
      );
    }
    return deatilsArray;
  }
}
