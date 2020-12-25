import { Component, OnInit } from '@angular/core';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { IMenuList } from 'src/app/shared/interfaces/IMenuList';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isHide = false;
  menuList: IMenuList[] = [
    {
      "menu_id": 0,
      "item_name": "",
      "cook_time": 0.0,
      "category": "",
      "course": "",
      "desrcription": "",
      "item_image_path": ""
    }
  ];

  constructor(
    private menuListService: MenuListService
  ) { }

  ngOnInit(): void {
    this.menuListService.getRestaurantMenuItems(1).subscribe(
      (data: any) => {
        this.menuList = data.resultList;
      }
    );
  }

  showPaymentDetails() {
    this.isHide = !this.isHide;
  }
  
  increaseQuantityOfDish(dishId) {
    console.log(dishId);
  }
}
