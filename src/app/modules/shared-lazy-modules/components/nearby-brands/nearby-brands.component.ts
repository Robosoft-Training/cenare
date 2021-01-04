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

  constructor(
    private popularProductsService: PopularProductsService,
  ) { }

  loadData = () => {
    this.popularProductsService.getNearbyBrands().subscribe(
      (nearByPopularDataList: any) => {
        this.deatilsArray = nearByPopularDataList.resultList;
        console.log(this.deatilsArray);
      }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

}
