import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  sortingFloat = (detailsArray, sortType) => {

    detailsArray.sort(
      (a, b) => {
        return parseFloat(b.rating) - parseFloat(a.rating);
      }
    );

    if (sortType === 'rating_high_low') {
      detailsArray.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      return detailsArray;
    }
    else if (sortType === 'rating_low_high') {
      detailsArray.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
      return detailsArray;
    }

    if (sortType === 'avg_high_low') {
      detailsArray.sort((a, b) => parseFloat(b.restaurant.avg_order_cost) - parseFloat(a.restaurant.avg_order_cost));
      return detailsArray;
    }
    else if (sortType === 'avg_low_high') {
      detailsArray.sort((a, b) => parseFloat(a.restaurant.avg_order_cost) - parseFloat(b.restaurant.avg_order_cost));
      return detailsArray;
    }
  }

  sortingAlphabetically = (detailsArray, sortType) => {

    const compareStrings = (a, b): any => {
      // console.log(a);
      a = a.toLowerCase();
      b = b.toLowerCase();
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    };

    if (sortType === 'a-z') {
      detailsArray.sort(
        (a, b) => {
          return compareStrings(a.restaurant.restaurant_name, b.restaurant.restaurant_name);
        }
      );
    }
    else if (sortType === 'z-a') {
      detailsArray.sort(
        (a, b) => {
          return compareStrings(b.restaurant.restaurant_name, a.restaurant.restaurant_name);
        }
      );
    }
    return detailsArray;
  }

  sortingByDate = (detailsArray, sortType) => {
    if(sortType === 'date_high_low'){
      detailsArray.sort(
        (a, b) => {
          return new Date(b.date).getDate() - new Date(a.date).getDate();
        }
      );
    }
    else {
      detailsArray.sort(
        (a, b) => {
          return new Date(a.date).getDate() - new Date(b.date).getDate();
        }
      );
    }
    return detailsArray;
  }
}
