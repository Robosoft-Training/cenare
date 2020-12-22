import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isErrorLoading = false;
  hasNextItem = true;
  hasPreviousItem = false;
  carouselCount = 0;

  constructor(
    private popularProductsService: PopularProductsService,
    private router: Router
  ) { }

  carouselControl = (count) => {
    this.carouselCount += count;
    const listLength = this.popularBrands.length;
    if (this.carouselCount === listLength) {
      this.hasNextItem = false;
    }
    else if (this.carouselCount === 0) {
      this.hasPreviousItem = false;
    }
    else {
      this.hasNextItem = true;
      this.hasPreviousItem = true;
    }
  }

  getDetails = (brandId: any) => {
    // Move to Brand details
    console.log(brandId);
  }

  getAllBrandsList = () => {
    this.router.navigate(['/shared-modules/nearby-brands']);
  }

  loadProducts = () => {
    this.isErrorLoading = false;
    this.popularProductsService.getPopularBrands().subscribe(
      (products: IPopularBrands[]) => {
        // console.log(products);
        this.popularBrands = products;
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

}
