import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  formType="cartItems";

  constructor(
    private paymentService: PaymentService
  ) { }

  showFormsType = (formType) => {
    this.formType = formType;
  }

  onGoToNextForm = () => {
    console.log("formType");
  }

  ngOnInit(): void {
    this.paymentService.nextFormRequestObserver.subscribe(
      msg => {
        console.log(msg);
      }
    );
  }

}
