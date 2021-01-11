import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  totalAmmount: any = 0.0;
  toPayAmmount: any = 0.0;
  discountAmmount: any = 0.0;
  startAdding = false;
  coockingInstructions = null;
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
  cartList: ICartItems[] = [
    {
      order_number: '',
      item_name: '',
      price: '',
      menu_price: '',
      menu_id: '',
      category: '',
      restaurant_id: '',
      quantity: ''
    }
  ];

  menuIdList: any = [];
  orderNo: any;
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
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  groupByCourse = (menuList) => {
    this.groupedMenuList = {};
    for (const [key, value] of Object.entries(menuList)) {
      if (!(this.groupedMenuList[menuList[key].menu.course])) {
        this.groupedMenuList[menuList[key].menu.course] = 0;
      }
      this.groupedMenuList[menuList[key].menu.course] += 1;
    }
  }

  prepareMenuIdList = (menuList) => {
    this.menuIdList = [];
    menuList.forEach((element: any) => {
      this.menuIdList.push(element.item_name);
    });
  }

  getTotalAmmount = (orderNumber) => {
    if (orderNumber && this.isLoggedIn) {
      this.cartService.getTotalAmmount(orderNumber).subscribe(
        data => {
          // this.totalAmmount = data['To Pay'];
          this.getAmmountDetails(orderNumber);
        }
      );
    }
  }

  getAmmountDetails = (orderNumber) => {
    if (orderNumber && this.isLoggedIn) {
      console.log(orderNumber);
      this.cartService.getAmmountDetails(orderNumber).subscribe(
        (data: any) => {
          this.totalAmmount = data.total_amount;
          this.toPayAmmount = data.to_pay;
          this.discountAmmount = data.discount;
        }
      )
    }
  }

  getAllCartData = (orderNumber) => {
    if (this.startAdding) {
      this.cartList = [];
      this.startAdding = false;
    }
    if (orderNumber && this.isLoggedIn) {
      this.cartService.getAllCartData(orderNumber).subscribe(
        data => {
          this.cartList = data.resultList;
          if (this.cartList.length === 0) {
            this.totalAmmount = 0;
            this.toPayAmmount = 0;
            this.discountAmmount = 0;
          }
          this.prepareMenuIdList(data.resultList);
          if (data.resultList.length >= 1) {
            this.getTotalAmmount(orderNumber);
          }
          else {
            this.totalAmmount = 0;
          }
        }
      );
    }
  }

  showPaymentDetails() {
    this.isHide = !this.isHide;
  }

  addTocart(dishId) {
    this.restaurentId = this.localStorageService.getRestId();
    this.menuIdList.push(dishId);
    this.cartService.addToCart(this.orderNo, this.restaurentId, dishId).subscribe(
      (data) => {
        this.getAllCartData(this.orderNo);
      }
    );
  }

  addTocartAgain(dishId, count) {
    this.restaurentId = this.localStorageService.getRestId();
    let quantity = 0;
    this.cartList.forEach(
      item => {
        console.log(item.menu_id, dishId);
        if (item.menu_id === dishId.toString()) {
          item.quantity = parseInt(item.quantity, 10);
          item.quantity += count;
          quantity = item.quantity;
          this.cartService.addToCartAgain(this.orderNo, this.restaurentId, dishId, quantity).subscribe(
            (data) => {
              this.getAllCartData(this.orderNo);
            }
          );
        }
      }
    );
  }

  clearCart = () => {
    this.cartService.clearCart(this.orderNo).subscribe(
      msg => {
        this.getAllCartData(this.orderNo);
        this.totalAmmount = 0;
        this.toPayAmmount = 0;
        this.discountAmmount = 0;
      }
    );
  }

  removeItem = (menuId) => {
    this.cartService.removeItem(this.orderNo, menuId).subscribe(
      (msg) => {
        this.getAllCartData(this.orderNo);
      }
    );
  }

  addCoockingInstructions = () => {
    if (this.coockingInstructions) {
      this.cartService.addCoockingInstructions(this.coockingInstructions, this.orderNo).subscribe(
        msg => {
          this.router.navigate(['/payment']);
        }
      );
    }
    else {
      this.router.navigate(['/payment']);
    }
  }

  ngOnInit(): void {
    this.menuListService.currentMenuDataListSource.subscribe(
      (data: any) => {
        if (data.resultList) {
          this.groupByCourse(data.resultList);
        }
        this.menuList = data.resultList;
        this.orderNo = data.order_num;
        this.getAllCartData(this.orderNo);
      }
    );

    this.loginService.isCurrentUserLogin.subscribe(
      (isLogin: any) => {
        this.isLoggedIn = isLogin;
      }
    );
    this.getAllCartData(this.orderNo);
    this.loginService.isUserLoggedIn();
  }
}
