import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  
  formType="cartItems";
  constructor() { }

  showFormsType = (formType) => {
    this.formType = formType;
  }

  ngOnInit(): void {
  }

}
