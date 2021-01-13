import { Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from 'src/app/modules/user-profile/components/add-address/add-address.component';
import { AddressService } from 'src/app/services/address-details/address.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PaymentService } from 'src/app/services/payment-methods/payment.service';
import { IAllUserAddress } from 'src/app/shared/interfaces/IAllUserAddress';

@Component({
  selector: 'app-choose-adress',
  templateUrl: './choose-adress.component.html',
  styleUrls: ['./choose-adress.component.scss']
})
export class ChooseAdressComponent implements OnInit {
  @Input() orderNumber: any;
  name = null;
  phoneNumber: any = "";
  nameError = false;
  phoneNumberError = false;
  selectedAddressId = 0;
  deliveryType = "deliver-to-me";
  deliveryInstructions = "";
  address = "";
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

  countryCode = '+91';
  userAddress: IAllUserAddress[] = [{
    address_id: 0,
    user_id: 0,
    city: "",
    area: "",
    address: "",
    address_label: "",
    landmark: "",
    primary_address: false
  }];

  constructor(
    private paymentService: PaymentService,
    private addressService: AddressService,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getAllUserAddress();
    this.addressService.currentAdressDataListSource.subscribe(
      (data: any) => {
        this.userAddress = data.resultList;
      }
    );
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
      this.userAddress.forEach(
        address => {
          if ((this.selectedAddressId === 0 && address.primary_address) || (address.address_id === this.selectedAddressId)) {
            this.address = address.address + ", " + address.area + "," + address.city;
            this.localStorageService.setAdressId(address.address_id);
          }
        });
        this.paymentService.chooseAddress(this.orderNumber, this.deliveryType, this.deliveryInstructions, this.address, this.name, this.phoneNumber, this.countryCode).subscribe(
        (msg) => {
          console.log(msg);
          this.paymentService.chooseAdress('payment-methods')
        }
      );
    }
  }

  setCountryFlag(code: any) {
    console.log(code);
  }
  
  getAllUserAddress() {
    this.addressService.getAllAddress().subscribe();
  }
  deleteAdress = (adressId) => {
    this.addressService.deleteAddress(adressId).subscribe(
      msg => {
        this.addressService.getAllAddress().subscribe();
        this.getAllUserAddress();
      }
    );
  }
  openDialog(formType: any): void {
    this.dialog.open(AddAddressComponent, { panelClass: 'custom-dialog-container', data: { formType } });
  }

  setPrimaryAddress(id: any) {
    console.log("card clic", id);
    this.selectedAddressId = id;
  }


}
