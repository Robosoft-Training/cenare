import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';
import { AddNewCardComponent } from 'src/app/modules/user-profile/components/add-new-card/add-new-card.component';
import { AddressService } from 'src/app/services/address-details/address.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CartService } from 'src/app/services/order-details/cart.service';
import { PaymentService } from 'src/app/services/payment-methods/payment.service';
import { RestaurantOverviewService } from 'src/app/services/resraurant-details/restaurant-overview/restaurant-overview.service';
import { ICartItems } from 'src/app/shared/interfaces/ICartItems';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  @Input() orderNumber: any;
  @Input() restaurentId: any;
  cardNumberFormControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]);
  nameOnCardFormControl = new FormControl('', Validators.required);
  expiryMonthFormControl = new FormControl('', [Validators.required,Validators.pattern('[0-9]{2}')]);
  expiryYearFormControl = new FormControl('', [Validators.required,Validators.pattern('[0-9]{4}')]);
  securityCodeFormControl = new FormControl('', [Validators.required,Validators.pattern('[0-9]{3}')]);

  matcher = new MyErrorStateMatcher();
  paymentType = 'cod';
  adress = "";
  restaurantName: any = "";
  restaurantAdress: any = "";

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


  cardlist: any = [
    {
      "user_card_id": 0,
      "card_number": 0,
      "name_on_card": "",
      "expiry_month": 0,
      "expiry_year": 0,
      "security_card": 0,
      "user_id": 0,
      "primary_card": false,
      "card_image": null
    }
  ];

  totalAmount = 0;
  disCountAmount = 0;
  toPayAmount = 0;
  
  constructor(
    private cartService: CartService, 
    private localStorageService: LocalStorageService,
    private adressService: AddressService,
    private paymentService: PaymentService,
    private restaurantOverviewService: RestaurantOverviewService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const adressId = this.localStorageService.getAdressId();

    this.paymentService.currentCardDataListSource.subscribe(
      (data: any) => {
        this.cardlist = data.resultList;
        console.log(data);
      });

    this.paymentService.getUsersAllCards().subscribe();

    this.adressService.getAllAddress().subscribe(
      (data: any) => {
        data.resultList.forEach(adress => {
          if(adress.address_id.toString() === adressId) {
            this.adress = adress.address + ', ' + adress.area + ', ' + adress.city;
          }
        });
      }
    );
    this.getRestaurantDetails();
  }

  getDetails = () => {
    this.cartService.getAllCartData(this.orderNumber).subscribe(
      data => {
        console.log(data);
        this.cartList = data.resultList;
      }
    );
    this.cartService.getAmmountDetails(this.orderNumber).subscribe(
      (data: any) => {
        this.totalAmount = data.total_amount;
        this.disCountAmount = data.discount;
        this.toPayAmount = data.to_pay;
      }
    );
  }

  getRestaurantDetails = () => {
    setTimeout(() => {
      this.restaurantOverviewService.getRestaurantDetails(this.restaurentId).subscribe(
        data => {
          this.restaurantName = data.restaurant_name;
         this.restaurantAdress = data.restaurant_address;
        }
      );
    }, 0);
  }


  openDialog(formType: any): void {
    this.dialog.open(AddNewCardComponent, { panelClass: 'custom-dialog-container', data: { formType } });
  }

  changeAdress = () => {
    this.paymentService.chooseAdress('chooseAdress');
  }
}
