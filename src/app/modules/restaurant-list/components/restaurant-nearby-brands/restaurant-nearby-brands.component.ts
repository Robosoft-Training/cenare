import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopularProductsService } from 'src/app/services/popular-products/popular-products.service';

@Component({
  selector: 'app-restaurant-nearby-brands',
  templateUrl: './restaurant-nearby-brands.component.html',
  styleUrls: ['./restaurant-nearby-brands.component.scss']
})
export class RestaurantNearbyBrandsComponent implements OnInit {

  deatilsArray: any[] = [
    {
      brands: {
        brand_id: 0,
        brand_name: '',
        city: '',
        description: '',
        food_image_path: '',
        logo_image_path: '',
        title: ''
      },
      outlets: 0
    }
  ];
  isLoading = true;

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

  loadData = () => {
    this.isLoading = true;
    this.popularProductsService.getNearbyBrands().subscribe(
      (nearByPopularDataList: any) => {
        this.deatilsArray = nearByPopularDataList.resultList;
        console.log(this.deatilsArray);
        this.isLoading = false;
      }
    );
  }

  diaplayMoreBrands = () => {
    this.router.navigate(['/shared-modules/nearby-brands']);
  }

  ngOnInit(): void {
    this.loadData();
  }

}
