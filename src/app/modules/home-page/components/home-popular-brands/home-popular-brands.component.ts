import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularProductsService } from 'src/app/services/popular-products/popular-products.service';
import { IPopularBrands } from 'src/app/shared/interfaces/IPopularBrands';

@Component({
  selector: 'app-home-popular-brands',
  templateUrl: './home-popular-brands.component.html',
  styleUrls: ['./home-popular-brands.component.scss']
})
export class HomePopularBrandsComponent implements OnInit {

  popularBrands: IPopularBrands[] = [];
  isLoading = true;

  constructor(
    private popularProductsService: PopularProductsService
  ) { }

  getDetails = (brandId: any) => {
    // Move to Brand details
    console.log(brandId);
  }

  getAllBrandsList = () => {
    // Move to all brands list
    console.log("All Brands");
  }

  loadProducts = () => {
    this.popularProductsService.getPopularBrands().subscribe(
      (products:IPopularBrands[]) => {
        console.log(products);
        this.popularBrands = products;
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

}
