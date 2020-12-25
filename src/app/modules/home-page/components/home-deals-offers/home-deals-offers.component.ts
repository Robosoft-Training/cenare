import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DealsOffersService } from 'src/app/services/deals-offers/deals-offers.service';
import { IDealsOffers } from 'src/app/shared/interfaces/IDealsOffers';

@Component({
  selector: 'app-home-deals-offers',
  templateUrl: './home-deals-offers.component.html',
  styleUrls: ['./home-deals-offers.component.scss']
})
export class HomeDealsOffersComponent implements OnInit {

  dealsOffers: IDealsOffers[] = [];
  isLoading = true;
  isErrorLoading = false;
  disableBtn1: boolean = true;
  disableBtn2: boolean = false;
  top: any;
  offSetHeight: any;
  scrollHeight: any;

  @ViewChild(
    'widgetsContent',
    { read: ElementRef }
  )
  public widgetsContent: any;

  constructor(
    private dealsOfferService: DealsOffersService
  ) { }

  getDetails = (offerId: any) => {
    // Go to offer details
    console.log('Details', offerId);
  }

  getAllOffersList = () => {
    // Go to offer details
    console.log('All offers');
  }

  loadProducts = () => {
    this.isErrorLoading = false;
    this.dealsOfferService.getDealsOffers().subscribe(
      (dealsOffers: any) => {
        // console.log(dealsOffers);
        this.dealsOffers = dealsOffers.resultList;
        this.isLoading = false;
      },
      err => {
        this.isErrorLoading = true;
      },
    );
  }

  ngOnInit(): void {
    // this.loadProducts();
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 550), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 550), behavior: 'smooth' });
  }

}
