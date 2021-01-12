import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { CartService } from 'src/app/services/order-details/cart.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  status = 'Active';
  orders = [{
    "orderNumber": 0,
    "restaurant_name": "",
    "restaurant_address": "",
    "numOFItems": 0,
    "totalAmount": 0
  }];

  totalAmount = 0;
  disCountAmount = 0;
  toPayAmount = 0;

  constructor(
    private userProfileService: UserProfileService,
    private cartService: CartService
  ) { }

  loadOrders = (status) => {
    this.status = status
    this.userProfileService.getUserOrders(status).subscribe(
      (data: any) => {
        this.orders = data.resultList;
      }
    )
  }

  ngOnInit(): void {
   this.loadOrders('active');
  }

  changeStarColor(clickID: number) {
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
    this.cartService.getAllCartData(orderNumber).subscribe(
      data => {
        console.log(data);
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
