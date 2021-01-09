import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CartService } from 'src/app/services/order-details/cart.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
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
  restaurentId: any;
  startAdding = false;
  coockingInstructions = null;
  formType = 'cartItems';
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
    private cartService: CartService
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
        this.totalAmmount = data['To Pay'];
      }
    );
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
          if (data.resultList.length >= 1) {
            this.getTotalAmmount(this.orderNumber);
          }
          else {
            this.totalAmmount = 0;
          }
        }
      );
    }
  }

  addTocartAgain(restId, dishId, count) {
    this.restaurentId = restId;

    console.log(this.restaurentId);
    let quantity = 0;
    this.cartList.forEach(
      item => {
        if (item.menu_id === dishId.toString()) {
          item.quantity = parseInt(item.quantity, 10);
          item.quantity += count;
          quantity = item.quantity;
          this.cartService.addToCartAgain(this.orderNumber, this.restaurentId, dishId, quantity).subscribe(
            (data) => {
              console.log(data);
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

  ngOnInit(): void {
    this.paymentService.nextFormRequestObserver.subscribe(
      msg => {
        this.showFormsType(msg);
      }
    );
    this.getAllCartData(this.orderNumber);
  }

}
