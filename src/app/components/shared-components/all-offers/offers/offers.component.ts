import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/services/offers/offers.service';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { RestaurantOverviewService } from 'src/app/services/resraurant-details/restaurant-overview/restaurant-overview.service';
import { ReviewsRatingsService } from 'src/app/services/resraurant-details/reviews-ratings/reviews-ratings.service';

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

  menuSearch = '';

  offerslist: any = [];

  cards = {
    code: "",
    offerId: "",
    offerImagePath: "",
    offerPercent: "",
    offerTitle: ""
  }

  cardlist: any = [
    {
      code: "CDB33",
      offerId: "CDB33",
      offerImagePath: "assets/images/offer_bg_3.jpg",
      offerPercent: "39",
      offerTitle: "So good Wednesday"
    },
    {
      code: "ABC12",
      offerId: "ABC12",
      offerImagePath: "assets/images/offer_bg_2.jpg",
      offerPercent: "40",
      offerTitle: "Everyday WOW! Value"
    },
    {
      code: "ABC56",
      offerId: "ABC12",
      offerImagePath: "assets/images/offer_bg_1.png",
      offerPercent: "20",
      offerTitle: "So good Wednesday"
    },
    {
      code: "XYZ79",
      offerId: "XYZ79",
      offerImagePath: "assets/images/offer_bg_4.jpg",
      offerPercent: "35",
      offerTitle: "So good Wednesday"
    }
  ];

  outlets: any = [
    {
      outletName: "Dubai Outlet Mall",
      outletAddress: "Food Court, Level 1, Dubai Outlet Mall, Dubai"
    },
    {
      outletName: "Al Nahda",
      outletAddress: "Grand Service Auto Station, Dubai Outlet Mall, Dubai"
    }
  ]

  isOpen = false;
  clickedCount = 0;
  clickedOffer: any = null;

  constructor(
    private menuListService: MenuListService,
    private restaurantReviewsService: ReviewsRatingsService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private restaurantOverview: RestaurantOverviewService,
    // private offersService: OffersService
  ) { }

  displayImage(offer, count) {
    this.clickedCount = count;
    this.clickedOffer = offer;
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = !this.isOpen;
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  getCurrentRestaurant = (data) => {
    console.log(data);
  }

  ngOnInit(): void {
    this.restaurentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.menuListService.getRestaurantMenuItems(this.restaurentId).subscribe(
      (data: any) => {
      }
    );

    // console.log(this.restaurantListService.currentretaurantDataList);
    this.restaurantReviewsService.getRestaurantReviews(this.restaurentId).subscribe(
      (data: any) => {
        console.log(data);
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
        console.log(this.image);
      }
    );

    // this.offersService.currentOffersDataListSource.subscribe(
    //   (data: any) => {
    //     console.log(data)
    //     this.offerslist = data.resultList;
    //     console.log(this.offerslist)
    //   }
    // );
  }

  showFormType(formName): void {
    this.formType = formName;
    console.log(formName);
  }

  leftArrow() {
    if (this.clickedCount === 0) {
      $("#left").addClass('left');
      $("#left").removeClass('leftArrow');
    }
    else {
      this.clickedOffer = this.offerslist[--this.clickedCount];
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      console.log(this.clickedCount);
    }
  }

  rightArrow() {
    if (this.clickedCount === this.offerslist.length - 1) {
      $("#right").addClass('right');
      $("#right").removeClass('rightArrow');
    }
    else {
      this.clickedOffer = this.offerslist[++this.clickedCount];
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      console.log(this.clickedCount);
    }
  }

}