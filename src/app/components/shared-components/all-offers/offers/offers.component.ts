import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/services/address-details/address.service';
import { OffersService } from 'src/app/services/offers/offers.service';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { RestaurantOverviewService } from 'src/app/services/resraurant-details/restaurant-overview/restaurant-overview.service';
import { ReviewsRatingsService } from 'src/app/services/resraurant-details/reviews-ratings/reviews-ratings.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OfferComponent implements OnInit {

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
  placeholderImage = "assets/images/Resturant Image_placeholder.png";
  rating1 = 0;
  rating2 = 0;
  rating3 = 0;
  rating4 = 0;
  rating5 = 0;
  likedReviewsId: any = [];
  restaurantRaring = 0;

  menuSearch = '';
  adress = "";

  offerslist: any = [];

  popoverData = {
    code: '',
    offerPercent: 0,
    offerImagePath: '',
    offerTitle: '',
    offerId: 0
  }

  cardlist: any = [
    {
      code: "",
      offerPercent: 0,
      offerImagePath: "",
      offerId: 0,
      offerTitle: ""
    }
  ];

  outlets: any = [
    {
      outletName: "Dubai Outlet Mall",
      outletAddress: "Food Court, Level 1, Dubai Outlet Mall, Dubai"
    }
  ]

  isOpen = false;
  clickedCount = 0;
  clickedOffer: any = null;

  constructor(
    private restaurantReviewsService: ReviewsRatingsService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private restaurantOverview: RestaurantOverviewService,
    private offersService: OffersService,
    private adressService: AddressService,
    private restaurantListService: RestaurantListService,
  ) { }

  displayPopover = (count) => {
    this.popoverData = this.cardlist[count];
  }

  displayImage(offer, count) {
    this.popoverData = this.cardlist[count];
    this.isOpen = !this.isOpen;
    this.leftArrow();
  }

  close() {
    this.isOpen = !this.isOpen;
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  ngOnInit(): void {
    this.restaurentId = this.activatedRoute.snapshot.paramMap.get('id');

    this.restaurantReviewsService.getRestaurantReviews(this.restaurentId).subscribe(
      (data: any) => {
      });

    this.restaurantListService.loadRestaurants().subscribe(
      msg => {
      }
    );

    this.restaurantOverview.getRestaurantOverview(this.restaurentId).subscribe(
      (data: any) => {
        this.name = data.restaurant_name
        this.cuisines = data.cuisines
        this.time = data.avg_delivery_time
        this.image = data.restaurant_image
        this.cost = data.min_order_cost
        this.openTime = data.open_time
        this.closeTime = data.close_time
        console.log(this.image);
      }
    );

    this.restaurantReviewsService.currentReviewsDataListSource.subscribe(
      (data: any) => {
        if (data.resultList) {
          data.resultList.slice().reverse().forEach(
            (item, index) => {
              this.likedReviewsId[index] = item.rating;
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
        console.log(restaurantDataList);
        if (restaurantDataList.resultList) {
          restaurantDataList.resultList.forEach(element => {
            console.log(typeof this.restaurentId, typeof element.restaurant.restaurant_id);
            if (this.restaurentId === element.restaurant.restaurant_id.toString()) {
              this.restaurantRaring = Math.round(element.rating);
            }
          });
        }
      }
    );

    this.offersService.getRestaurantOffers(this.restaurentId).subscribe(
      data => {
        this.cardlist = data.resultList;
      }
    );
    this.adressService.getPrimaryAddress().subscribe(
      data => {
        this.adress = data.area + ", " + data.city;
      }
    );
  }

  showFormType(formName): void {
    this.formType = formName;
  }

  leftArrow() {
    if (this.clickedCount === 0) {
      $("#left").addClass('left');
      $("#left").removeClass('leftArrow');
    }
    else {
      this.clickedOffer = this.cardlist[--this.clickedCount];
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      this.displayPopover(this.clickedCount);
    }
  }

  rightArrow() {
    if (this.clickedCount === this.cardlist.length - 1) {
      $("#right").addClass('right');
      $("#right").removeClass('rightArrow');
    }
    else {
      this.clickedOffer = this.cardlist[++this.clickedCount];
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      this.displayPopover(this.clickedCount);
    }
  }

}