import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OffersComponent } from 'src/app/components/shared-components/empty-scenario/offers/offers.component';
import { DealsOffersService } from 'src/app/services/deals-offers/deals-offers.service';
import { IDealsOffers } from 'src/app/shared/interfaces/IDealsOffers';

@Component({
  selector: 'app-home-deals-offers',
  templateUrl: './home-deals-offers.component.html',
  styleUrls: ['./home-deals-offers.component.scss']
})
export class HomeDealsOffersComponent implements OnInit {

  dealsOffers: IDealsOffers[] = [
    {
      code: '',
      offerPercent: 0,
      offerImagePath: '',
      offerId: 0,
      offerTitle: '0'
    }
  ];
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
    private dealsOfferService: DealsOffersService,
    public dialog: MatDialog
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
        if (dealsOffers.resultList.length === 0) {
          const dialogRef = this.dialog.open(OffersComponent, { panelClass: 'dialog' });
          dialogRef.afterClosed().subscribe(result => {
          });
        }
        this.dealsOffers = dealsOffers.resultList;
        this.isLoading = false;
      },
      err => {
        this.isErrorLoading = true;
      },
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 550), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 550), behavior: 'smooth' });
  }

}
