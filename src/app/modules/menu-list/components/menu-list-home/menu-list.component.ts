import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { ReviewsRatingsService } from 'src/app/services/resraurant-details/reviews-ratings/reviews-ratings.service';
import { RestaurantOverviewService } from 'src/app/services/resraurant-details/restaurant-overview/restaurant-overview.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, AfterViewInit {
  formType = 'menu';
  restaurentId: any = 0;
  currentRestaurant: any;
  name: any = '';
  cuisines: any = '';
  time: any = '';
  image: any = '';
  cost: any = '';
  openTime: any = [0, 0];
  closeTime: any = [0, 0];
  placeholderImage = "assets/images/rest_placeholder.png";
  rating1 = 0;
  rating2 = 0;
  rating3 = 0;
  rating4 = 0;
  rating5 = 0;
  likedReviewsId: any = [];
  restaurantRaring = 0;

  constructor(
    private menuListService: MenuListService,
    private restaurantReviewsService: ReviewsRatingsService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private restaurantOverview: RestaurantOverviewService,
    private restaurantListService: RestaurantListService
  ) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  ngOnInit(): void {
    this.restaurentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.menuListService.getRestaurantMenuItems(this.restaurentId).subscribe(
      (data: any) => {
      }
    );

    this.restaurantReviewsService.getRestaurantReviews(this.restaurentId).subscribe(
      (data: any) => {
      });


    this.restaurantOverview.getRestaurantOverview(this.restaurentId).subscribe(
      (data: any) => {
        this.name = data.restaurant_name
        this.cuisines = data.cuisines
        this.time = data.avg_delivery_time
        this.image = data.restaurant_image
        this.cost = data.min_order_cost
        this.openTime = data.open_time
        this.closeTime = data.close_time
      }
    );

    this.restaurantReviewsService.currentReviewsDataListSource.subscribe(
      (data: any) => {
        if (data.resultList) {;
          data.resultList.reverse().forEach(
            (item, index) => {;
              this.likedReviewsId[index] = item.rating;;
            }
          );
          this.rating1 = this.likedReviewsId[0];
          this.rating2 = this.likedReviewsId[1];
          this.rating3 = this.likedReviewsId[2];
          this.rating4 = this.likedReviewsId[3];
          this.rating5 = this.likedReviewsId[4];
        }
      }
    );

    this.restaurantListService.currentretaurantDataListSource.subscribe(
      (restaurantDataList: any) => {
        if (restaurantDataList.resultList) {
          restaurantDataList.resultList.forEach(element => {
            console.log(typeof this.restaurentId, typeof element.restaurant.restaurant_id);
            if (this.restaurentId === element.restaurant.restaurant_id.toString()) {
              this.restaurantRaring = element.rating;
            }
          });
        }
      }
    );
  }

  showFormType(formName): void {
    this.formType = formName;
  }

}
