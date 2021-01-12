import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { data } from 'jquery';
import { AddressService } from 'src/app/services/address-details/address.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { IAllUserAddress } from 'src/app/shared/interfaces/IAllUserAddress';

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
  userAddress: IAllUserAddress[] = [{
    address_id: 0,
    user_id: 0,
    city: "",
    area: "",
    address: "",
    address_label: "",
    landmark: "",
    primary_address: true
  }];

  constructor(
    private paymentService: PaymentService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void { 
    this.getAllUserAddress();
  }

  submitDetails() {
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
      this.paymentService.chooseAdress('payment-methods');
    }
  }

  setCountryFlag(code: any) {
    console.log(code);
  }
  getAllUserAddress() {
    this.addressService.getAllAddress().subscribe(
      (data: any) => {
        console.log("xYZ", data);
        
        this.userAddress = data.resultList;
      }
    );
  }
}
