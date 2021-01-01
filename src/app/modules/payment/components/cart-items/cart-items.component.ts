import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  formType="cartItems";
  constructor(
  ) { }

  showFormsType = (formType) => {
    this.formType = formType;
  }

  ngOnInit(): void {
  }

}
