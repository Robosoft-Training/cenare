import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
  @Input() payAmount: any;
  @Input() discAmmount: any;

  matcher = new MyErrorStateMatcher();
  paymentType = 'cod';
  adress = "";
  restaurantName: any = "";
  restaurantAdress: any = "";
  cardId: any = 0;
  saveCard: any = 'not-save';

  cvv = { value: '', error: '' };
  name = { value: '', error: '' };
  cardNumber = { value: '', error: '' };
  expiryMonth: any = { value: '', error: '' };
  expiryYear: any = { value: '', error: '' };

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;

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
          if (adress.address_id.toString() === adressId) {
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

  chooseCard = (cardId) => {
    this.cardId = cardId;
    console.log(cardId);
  }

  openDialog(formType: any): void {
    this.dialog.open(AddNewCardComponent, { panelClass: 'custom-dialog-container', data: { formType } });
  }

  changeAdress = () => {
    this.paymentService.chooseAdress('chooseAdress');
  }

  submitDetails = () => {
    let cvv;
    let cardNumber;
    if (this.cardlist.length > 0) {
      this.cardlist.forEach(card => {
        if (card.user_card_id === this.cardId) {
          cvv = card.security_card;
          cardNumber = card.card_number;
        }
      });

      setTimeout(() => {
        this.paymentService.payForOrder(this.orderNumber, this.payAmount - this.discAmmount, cvv, cardNumber).subscribe(
          msg => {
            console.log(msg);
          }
        );
      }, 0);
    }
    else {

      if (!this.cardNumber.value || this.cardNumber.value.length < 16) {
        this.cardNumber.error = 'Card number is required';
      }
      else if (!this.name.value) {
        this.cardNumber.error = '';
        this.name.error = 'Name is required';
      }
      else if (!this.expiryMonth.value) {
        this.name.error = '';
        this.expiryMonth.error = 'Please enter month';
      }
      else if (!this.expiryYear.value) {
        this.expiryMonth.error = '';
        this.expiryYear.error = 'Please enter year';
      }
      else if (!this.cvv.value) {
        this.expiryYear.error = '';
        this.cvv.error = 'Please enter CVV';
      }
      else if (this.expiryMonth.value < 1 || this.expiryMonth.value > 12) {
        this.cvv.error = '';
        this.expiryMonth.error = 'Enter correct month';
      }
      else if (this.expiryYear.value < this.currentYear) {
        this.expiryYear.error = 'Enter correct year';
      }
      else if (this.expiryYear.value === this.currentYear) {
        if (this.expiryMonth.value > this.currentMonth) {
          this.expiryMonth.error = "Enter correct month"
        }
      }
      else {
        this.name.error = '';
        this.cardNumber.error = '';
        this.expiryMonth.error = '';
        this.expiryYear.error = '';
        this.cvv.error = '';
        if (this.saveCard === 'save') {
          console.log("Saved");
          this.paymentService.addCard(this.cardNumber.value, this.expiryMonth.value, this.expiryYear.value, this.name.value, this.cvv.value).subscribe(
            msg => {
              this.paymentService.getUsersAllCards().subscribe();
            }
          );
        }
        setTimeout(() => {
          this.paymentService.payForOrder(this.orderNumber, this.payAmount - this.discAmmount, this.cvv.value, this.cardNumber.value).subscribe(
            msg => {
              console.log(msg);
            }
          );
        }, 0);
      }
    }
  }
}
