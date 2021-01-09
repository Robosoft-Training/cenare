import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/order-details/cart.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { RestaurantOverviewService } from 'src/app/services/resraurant-details/restaurant-overview/restaurant-overview.service';
import { ICartItems } from 'src/app/shared/interfaces/ICartItems';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  @Input() orderNumber: any;
  @Output() notify = new EventEmitter();

  totalAmmount: any = 0.0;
  toPayAmmount: any = 0.0;
  discountAmmount: any = 0.0;
  restaurentId: any;
  startAdding = false;
  coockingInstructions = null;
  formType = 'cartItems';
  restaurantName = "";
  deliveryTime = 0;
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

  constructor(
    private paymentService: PaymentService,
    private cartService: CartService,
    private restaurantOverviewService: RestaurantOverviewService
  ) { }

  showFormsType = (formType, backword = false) => {
    if (formType === 'chooseAdress') {
      this.cartService.progressUpdate('2');
    }
    else if (formType === 'payment-methods') {
      this.cartService.progressUpdate('3');
    }
    else if (formType === 'cartItems') {
      this.cartService.progressUpdate('1');
    }
    if (backword) {
      this.paymentService.chooseAdress(formType);
    }
    this.formType = formType;
  }

  getTotalAmmount = (orderNumber) => {
    this.cartService.getTotalAmmount(orderNumber).subscribe(
      data => {
        this.getAmmountDetails(this.orderNumber);
      }
    );
  }

  getAmmountDetails = (orderNumber) => {
    this.cartService.getAmmountDetails(orderNumber).subscribe(
      (data: any) => {
        this.totalAmmount = data.total_amount;
        this.toPayAmmount = data.to_pay;
        this.discountAmmount = data.discount;
      }
    )
  }

  getAllCartData = (orderNumber) => {
    if (this.startAdding) {
      this.cartList = [];
      this.startAdding = false;
    }
    if (orderNumber) {
      this.cartService.getAllCartData(orderNumber).subscribe(
        data => {
          this.cartList = data.resultList;
          this.restaurentId = data.resultList[0].restaurant_id;
          if (data.resultList.length >= 1) {
            this.getTotalAmmount(this.orderNumber);
          }
          else {
            this.totalAmmount = 0;
          }
          this.getRestaurantDetails();
        }
      );
    }
  }

  addTocartAgain(restId, dishId, count) {
    this.restaurentId = restId;
    let quantity = 0;
    this.cartList.forEach(
      item => {
        if (item.menu_id === dishId.toString()) {
          item.quantity = parseInt(item.quantity, 10);
          item.quantity += count;
          quantity = item.quantity;
          this.cartService.addToCartAgain(this.orderNumber, this.restaurentId, dishId, quantity).subscribe(
            (data) => {
              this.getAllCartData(this.orderNumber);
            }
          );
        }
      }
    );
  }

  removeItem = (menuId) => {
    this.cartService.removeItem(this.orderNumber, menuId).subscribe(
      (msg) => {
        this.getAllCartData(this.orderNumber);
      }
    );
  }

  getRestaurantDetails = () => {
    this.restaurantOverviewService.getRestaurantDetails(this.restaurentId).subscribe(
      data => {
        this.restaurantName = data.restaurant_name;
        this.deliveryTime = data.avg_delivery_time;
      }
    );
  }

  addCoockingInstructions = () => {
    if (this.coockingInstructions) {
      this.cartService.addCoockingInstructions(this.coockingInstructions, this.orderNumber).subscribe(
        msg => {
          console.log(msg);
          this.showFormsType('chooseAdress');
        }
      );
    }
    else {
      this.showFormsType('chooseAdress');
    }
  }

  ngOnInit(): void {
    this.paymentService.nextFormRequestObserver.subscribe(
      msg => {
        this.showFormsType(msg);
      }
    );
    this.getAllCartData(this.orderNumber);
  }

}
