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
  menuList: any[] = [
    {
      "menu": {
        "menu_id": 0,
        "item_name": "",
        "cook_time": 0,
        "category": "",
        "course": "",
        "desrcription": "",
        "item_image_path": ""
      },
      "price": 0
    }
  ];

  restaurentId: any;
  groupedMenuList: any = {
    "key": 0
  };

  constructor(
    private menuListService: MenuListService,
  ) { }

  groupByCourse = (menuList) => {
    this.groupedMenuList = {};
    for (let [key, value] of Object.entries(menuList)) {
      if (!(this.groupedMenuList[menuList[key].menu.course])) {
          this.groupedMenuList[menuList[key].menu.course] = [];
          this.groupedMenuList[menuList[key].menu.course] = 0;
      }
      this.groupedMenuList[menuList[key].menu.course] += 1;
    }
    console.log(this.groupedMenuList);
  }

  ngOnInit(): void {
    this.menuListService.currentMenuDataListSource.subscribe(
      (data: any) => {
        if(data.resultList){
         this.groupByCourse(data.resultList)
        }
        console.log(typeof data.resultList);
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
