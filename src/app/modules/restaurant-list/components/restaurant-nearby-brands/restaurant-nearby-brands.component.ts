import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 250), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 250), behavior: 'smooth' });
  }

  convertToarray = (nearByPopularDataList) => {
    this.deatilsArray = [];
    for (const i in nearByPopularDataList) {
      if (nearByPopularDataList[i]) {
        this.deatilsArray.push(nearByPopularDataList[i]);
      }
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

  diaplayMoreBrands = () => {
    this.router.navigate(['/shared-modules/nearby-brands']);
  }

  ngOnInit(): void {
    // this.loadData();
  }

}
