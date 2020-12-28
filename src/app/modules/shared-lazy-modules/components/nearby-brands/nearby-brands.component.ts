import { Component, OnInit } from '@angular/core';
import { PopularProductsService } from 'src/app/services/popular-products/popular-products.service';

@Component({
  selector: 'app-nearby-brands',
  templateUrl: './nearby-brands.component.html',
  styleUrls: ['./nearby-brands.component.scss']
})
export class NearbyBrandsComponent implements OnInit {

  deatilsArray: any[] = [
    {
      brand_id: 0,
      brand_name: "",
      city: "",
      description: "",
      food_image_path: "",
      logo_image_path: "",
      title: ""
    }
  ];

  constructor(
    private popularProductsService: PopularProductsService,
  ) { }

  loadData = () => {
    this.popularProductsService.currentnearbyBrandsDataListSource.subscribe(
      (nearByPopularDataList: any) => {
        this.deatilsArray = nearByPopularDataList.resultList;
      }
    );
    this.popularProductsService.loadNearbyBrands();
  }

  ngOnInit(): void {
    this.loadData();
  }

}
