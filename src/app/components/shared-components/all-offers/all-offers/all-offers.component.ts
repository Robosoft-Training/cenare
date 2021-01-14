import { Component, ElementRef, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address-details/address.service';
import { DealsOffersService } from 'src/app/services/deals-offers/deals-offers.service';
import { IDealsOffers } from 'src/app/shared/interfaces/IDealsOffers';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.scss']
})
export class AllOffersComponent implements OnInit {

  menuSearch = '';
  adress = "";

  offerslist: IDealsOffers[] = [
    {
      code: '',
      offerPercent: 0,
      offerImagePath: '',
      offerTitle: '',
      offerId: 0
    }
  ];

  popoverData = {
    code: '',
    offerPercent: 0,
    offerImagePath: '',
    offerTitle: '',
    offerId: 0
  }

  cards = {
    code: "",
    offerId: "",
    offerImagePath: "",
    offerPercent: "",
    offerTitle: ""
  }

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
    private allOffersService: DealsOffersService,
    private adressService: AddressService,
  ) { }

  displayImage(count) {
    this.clickedCount = count;
    this.popoverData = this.offerslist[count];
    this.isOpen = !this.isOpen;
  }

  displayPopover = (count) => {
    this.popoverData = this.offerslist[count];
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
        this.offerslist = data.resultList;
      }
    );
    this.adressService.getPrimaryAddress().subscribe(
      data => {
        this.adress = data.area + ", " + data.city;
      }
    );
  }

  leftArrow(co) {
    this.clickedCount += co;
    if (this.clickedCount <= 0) {
      this.clickedOffer = this.offerslist[this.clickedCount];
      $("#left").addClass('left');
      $("#left").removeClass('leftArrow');
      this.displayPopover(this.clickedCount);
    }
    else if (this.clickedCount === this.offerslist.length - 1) {
      this.clickedOffer = this.offerslist[this.clickedCount];
      $("#right").addClass('right');
      $("#right").removeClass('rightArrow');
      this.displayPopover(this.clickedCount);
    }
    else {
      this.clickedOffer = this.offerslist[this.clickedCount];
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      this.displayPopover(this.clickedCount);
    }
  }
}