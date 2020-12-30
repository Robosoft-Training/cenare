import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { RestaurantOverviewService } from 'src/app/services/resraurant-details/restaurant-overview/restaurant-overview.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, AfterViewInit{
  formType = 'menu';
  restaurentId: any = 0;
  currentRestaurant: any;
  name:any='';
  cuisines:any='';
  time:any='';
  image:any='';
  cost:any='';
  openTime:any=[0,0];
  closeTime:any=[0,0];

  constructor(
    private menuListService: MenuListService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private restaurantListService: RestaurantListService,
    private restaurantOverview:  RestaurantOverviewService
  ) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  getCurrentRestaurant = (data) => {
    console.log(data);
  }

  ngOnInit(): void {
    this.restaurentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.menuListService.getRestaurantMenuItems(this.restaurentId).subscribe(
      (data: any) => {
      }
    );
    // console.log(this.restaurantListService.currentretaurantDataList);
    this.restaurantOverview.getRestaurantOverview(this.restaurentId).subscribe(
      (data: any) => {
        this.name=data.restaurant_name
        this.cuisines=data.cuisines
        this.time=data.avg_delivery_time
        this.image=data.restaurant_image
        this.cost=data.min_order_cost
        this.openTime=data.open_time
      this.closeTime=data.close_time
       //console.log(data);
      }
    );
  }

  showFormType(formName): void {
    this.formType = formName;
    console.log(formName);
  }

}
