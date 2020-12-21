import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopularProductsService } from 'src/app/services/popular-products/popular-products.service';

@Component({
  selector: 'app-restaurant-nearby-brands',
  templateUrl: './restaurant-nearby-brands.component.html',
  styleUrls: ['./restaurant-nearby-brands.component.scss']
})
export class RestaurantNearbyBrandsComponent implements OnInit {

  deatilsArray: any[] = [];

  @ViewChild(
    'widgetsContent',
    { read: ElementRef }
  )
  public widgetsContent: any;

  constructor(
    private popularProductsService: PopularProductsService,
  ) { }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 250), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 250), behavior: 'smooth' });
  }

  convertToarray = (nearByPopularDataList) => {
    this.deatilsArray = [];
    for (var i in nearByPopularDataList) {
      this.deatilsArray.push(nearByPopularDataList[i]);
      // console.log(this.deatilsArray);
    }
  }

  loadData = () => {
    // this.popularProductsService.currentnearbyBrandsDataListSource.subscribe(
    //   (nearByPopularDataList) => {
    //     this.convertToarray(nearByPopularDataList);
    //   }
    // );
    // this.popularProductsService.loadNearbyBrands();
    this.popularProductsService.getPopularBrands().subscribe(
      data => {
        this.deatilsArray = data;
      }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

}
