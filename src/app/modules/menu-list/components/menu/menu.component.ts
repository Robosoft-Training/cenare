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
      menu: {
        menu_id: 0,
        item_name: '',
        cook_time: 0,
        category: '',
        course: '',
        desrcription: '',
        item_image_path: ''
      },
      price: 0
    }
  ];

  restaurentId: any;
  groupedMenuList: any = {
    key: 0
  };

  menuSearch = '';
  timeOut: any;

  constructor(
    private menuListService: MenuListService,
  ) { }

  groupByCourse = (menuList) => {
    this.groupedMenuList = {};
    for (const [key, value] of Object.entries(menuList)) {
      if (!(this.groupedMenuList[menuList[key].menu.course])) {
        this.groupedMenuList[menuList[key].menu.course] = 0;
      }
      this.groupedMenuList[menuList[key].menu.course] += 1;
    }
    // console.log(this.groupedMenuList);
  }

  groupByCourseSearch = (menuList) => {
    this.groupedMenuList = {};
    for (const [key, value] of Object.entries(menuList)) {
      // console.log(key);
    }
    // console.log(this.groupedMenuList);
  }

  searchAction = (event: any) => {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(
      () => {
        if (event.keyCode !== 13) {
          this.executeSearch(event.target.value);
        }
      }
      , 1000);
  }

  executeSearch = (value: any) => {
    this.menuListService.getRestaurantMenuItemsBySearch(value).subscribe(
      (data: any) => {
        if (value) {
          const tempArray: any = [];
          if (data.menuResponse) {
            tempArray.push(data.menuResponse);
            this.groupByCourse(tempArray);
          }
          console.log(tempArray);
          this.menuList = tempArray;
        }
      }
    );
  }

  ngOnInit(): void {
    this.menuListService.currentMenuDataListSource.subscribe(
      (data: any) => {
        if (data.resultList) {
          this.groupByCourse(data.resultList);
        }
        console.log(data.resultList);
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
