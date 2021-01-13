import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { CartService } from 'src/app/services/order-details/cart.service'
import { ICartItems } from 'src/app/shared/interfaces/ICartItems';
import { AddressService } from 'src/app/services/address-details/address.service';
import { PaymentService } from 'src/app/services/payment-methods/payment.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  review: any = "";
  status = 'Active';
  adress: any;
  rating: any = 0;
  orders = [{
    "orderNumber": 0,
    "restaurant_name": "",
    "restaurant_address": "",
    "numOFItems": 0,
    "totalAmount": 0
  }];
  
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

  totalAmount = 0;
  disCountAmount = 0;
  toPayAmount = 0;
  isLoggedIn = false;
  orderNumber: any;

  constructor(
    private userProfileService: UserProfileService,
    private cartService: CartService,
    private adressService: AddressService,
    private paymentService: PaymentService
  ) { }

  loadOrders = (status) => {
    this.status = status
    this.userProfileService.getUserOrders(status).subscribe(
      (data: any) => {
        this.orders = data.resultList;
      }
    )
  }

  submitReview = () => {
    this.paymentService.rateForDelivery(this.adress, this.review, this.rating, this.orderNumber).subscribe();
  }

  ngOnInit(): void {
   this.loadOrders('active');
   this.adressService.getPrimaryAddress().subscribe(
    data => {
      if (data) {
        this.adress = data.area + ", " + data.city;
      }
    }
  );
  }

  changeStarColor(clickID: number) {
    this.rating = clickID;
    this.removeAllColor();
    if (clickID <= 2) {
      this.addColor(clickID, 'red-color');
    } else if (clickID <= 4) {
      this.addColor(clickID, 'orange-color');
    }
    else {
      this.addColor(clickID, 'green-color');
    }
  }
  addColor(id: number, addClass: any) {
    while (id !== 0) {
      $('#' + id).addClass(addClass);
      $('#' + id).removeClass('grey-color');
      id--;
    }
  }
  removeAllColor() {
    for (let i = 1; i < 6; i++) {
      $('#' + i).removeClass('green-color');
      $('#' + i).removeClass('orange-color');
      $('#' + i).removeClass('red-color');
      $('#' + i).addClass('grey-color');
    }
  }

  getDetails = (orderNumber) => {
    this.orderNumber = orderNumber;
    this.cartService.getAllCartData(orderNumber).subscribe(
      data => {
        console.log(data);
        this.cartList = data.resultList;
      }
    );
    this.cartService.getAmmountDetails(orderNumber).subscribe(
      (data: any) => {
        this.totalAmount = data.total_amount;
        this.disCountAmount = data.discount;
        this.toPayAmount = data.to_pay;
      }
    );
  }

}
