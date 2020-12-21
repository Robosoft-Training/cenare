import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-restaurant-nearby-brands',
  templateUrl: './restaurant-nearby-brands.component.html',
  styleUrls: ['./restaurant-nearby-brands.component.scss']
})
export class RestaurantNearbyBrandsComponent implements OnInit {


  @ViewChild(
    'widgetsContent',
    { read: ElementRef }
  )
  public widgetsContent: any;

  constructor() { }

  ngOnInit(): void {
  }


  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 250), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 250), behavior: 'smooth' });
  }
}
