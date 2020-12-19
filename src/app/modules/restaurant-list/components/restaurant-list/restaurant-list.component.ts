import { Component, OnInit } from '@angular/core';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  constructor(
    private restaurantListService: RestaurantListService
  ) { }

  ngOnInit(): void {
    this.restaurantListService.currentretaurantDataListSource.subscribe(
      (retaurantDataList) => {
        console.log(retaurantDataList);
      }
    );
    this.restaurantListService.loadRestaurants();
  }
}
