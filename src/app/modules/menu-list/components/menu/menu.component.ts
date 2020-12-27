import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/authentication/login.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CartService } from 'src/app/services/order-details/cart.service';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { ICartItems } from 'src/app/shared/interfaces/ICartItems';
import { IMenuList } from 'src/app/shared/interfaces/IMenuList';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isHide = false;
  isLoggedIn = false;
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
  cartList: any[] = [
    {
      order_number: '',
      item_name: 'Payasam',
      price: '',
      menu_price: '',
      quantity: 2
    },
    {
      order_number: '',
      item_name: 'Patrade',
      price: '',
      menu_price: '',
      quantity: 5
    }
  ];
  menuIdList: any = [];

  restaurentId: any;
  groupedMenuList: any = {
    key: 0
  };

  menuSearch = '';
  timeOut: any;

  constructor(
    private menuListService: MenuListService,
    private loginService: LoginService,
    private cartService: CartService,
    private localStorageService: LocalStorageService
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

  prepareMenuIdList = (menuList) => {
    this.menuIdList = [];
    menuList.forEach((element: any) => {
      this.menuIdList.push(element.item_name);
      console.log(this.menuIdList);
    });
  }

  getAllCartData = (orderNumber) => {
    if (orderNumber && this.isLoggedIn) {
      this.cartService.getAllCartData(orderNumber).subscribe(
        data => {
          console.log(data.resultList);
          this.cartList = data.resultList;
          this.prepareMenuIdList(data.resultList);
        }
      );
    }
    console.log(['1', '2 gh', '3'].includes('2 gh'));
  }

  ngOnInit(): void {
    this.menuListService.currentMenuDataListSource.subscribe(
      (data: any) => {
        if (data.resultList) {
          this.groupByCourse(data.resultList);
        }
        this.menuList = data.resultList;
        // this.getAllCartData(data.order_num);
      }
    );

    this.loginService.isCurrentUserLogin.subscribe(
      (isLogin: any) => {
        this.isLoggedIn = isLogin;
      }
    );

    this.loginService.isUserLoggedIn();

  }

  showPaymentDetails() {
    this.isHide = !this.isHide;
  }

  addTocart(dishId) {
    this.restaurentId = this.localStorageService.getRestId();
    // console.log(dishId);
    this.menuIdList.push(dishId);
    let newCartItem = {
      order_number: '',
      item_name: dishId,
      price: '',
      menu_price: '',
      quantity: 1
    }
    this.cartList.push(
      newCartItem
    )
  }


  addTocartAgain(dishId, count) {
    this.restaurentId = this.localStorageService.getRestId();
    // console.log(dishId, count);
    this.cartList.forEach(
      item => {
        if (item.item_name === dishId) {
          item.quantity += count
        }
      }
    )
  }
}
