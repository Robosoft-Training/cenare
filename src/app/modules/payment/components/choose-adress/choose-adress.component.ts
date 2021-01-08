import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-choose-adress',
  templateUrl: './choose-adress.component.html',
  styleUrls: ['./choose-adress.component.scss']
})
export class ChooseAdressComponent implements OnInit {

  name = null;
  phoneNumber: any = "";
  nameError = false;
  phoneNumberError = false;
  flagImageUrlArray = [
    {
      code: "+91",
      url: "assets/images/country-flag/+91.png"
    },
    {
      code: "+1",
      url: "assets/images/country-flag/+1.png"
    },
    {
      code: "+44",
      url: "assets/images/country-flag/+44.png"
    }
  ]

  selected = '+91';

  constructor(
    private paymentService: PaymentService
  ) { }
  
  ngOnInit(): void {}

  submitDetails(){
    if (!(this.name)) {
      this.nameError = true;
    }
    else if (this.phoneNumber.toString().length !== 10) {
      this.nameError = false;
      this.phoneNumberError = true;
    }
    else {
      this.nameError = false;
      this.phoneNumberError = false;
      this.paymentService.chooseAdress();
    }
  }

  setCountryFlag(code:any){
    console.log(code);
  }
}
