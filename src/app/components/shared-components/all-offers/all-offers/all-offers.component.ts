import { Component, ElementRef, OnInit } from '@angular/core';
import { DealsOffersService } from 'src/app/services/deals-offers/deals-offers.service';
import { IDealsOffers } from 'src/app/shared/interfaces/IDealsOffers';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.scss']
})
export class AllOffersComponent implements OnInit {

  menuSearch = '';

  offerslist: IDealsOffers[] = [
    {
      code: '',
      offerPercent: 0,
      offerImagePath: '',
      offerTitle: '',
      offerId: 0
    }
  ];

  // offerslist: any = [];

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
      offerImagePath: "../../../../../assets/images/offer_bg_3.jpg",
      offerPercent: "39",
      offerTitle: "So good Wednesday"
    },
    {
      code: "ABC12",
      offerId: "ABC12",
      offerImagePath: "../../../../../assets/images/offer_bg_2.jpg",
      offerPercent: "40",
      offerTitle: "Everyday WOW! Value So good Wednesday So good Wednesday"
    },
    {
      code: "ABC56",
      offerId: "ABC56",
      offerImagePath: "../../../../../assets/images/offer_bg_1.png",
      offerPercent: "20",
      offerTitle: "So good Wednesday"
    },
    {
      code: "XYZ79",
      offerId: "XYZ79",
      offerImagePath: "../../../../../assets/images/offer_bg_4.jpg",
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
    private elementRef: ElementRef,
    private allOffersService: DealsOffersService
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

  ngOnInit(): void {
    this.allOffersService.getDealsOffers().subscribe(
      (data: any) => {
        console.log(data)
        this.offerslist = data.resultList;
        console.log(this.offerslist)
      }
    );
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