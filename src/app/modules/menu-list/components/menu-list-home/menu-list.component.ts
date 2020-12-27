import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
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

  constructor(
    private menuListService: MenuListService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private restaurantListService: RestaurantListService
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
    console.log(this.restaurantListService.currentretaurantDataList);
  }

  showFormType(formName): void {
    this.formType = formName;
    console.log(formName);
  }

}
