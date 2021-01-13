import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewCardComponent } from '../add-new-card/add-new-card.component';
import { PaymentService } from 'src/app/services/payment-methods/payment.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {

  cards = {
    icon: '',
    cardNumber: '',
    cardName: '',
  };

  // cardlist: any = [
  //   {
  //     icon: 'assets/images/visa_icon.png',
  //     cardNumber: '2345 XXXX XXXX 6574',
  //     cardName: 'Visa',
  //   },
  //   {
  //     icon: 'assets/images/mastercard_icon.png',
  //     cardNumber: '1234 XXXX XXXX 3456',
  //     cardName: 'Master card',
  //   }
  // ];

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

  constructor(
    public dialog: MatDialog,
    private paymentService: PaymentService,
  ) { }

  updatePrimaryCard = (cardId) => {
    this.paymentService.updatePrimaryCard(cardId).subscribe(
      msg => {
      }
    );
  }

  deleteCard = (cardId) => {
    this.paymentService.deleteCard(cardId).subscribe(
      msg => {
        this.paymentService.getUsersAllCards().subscribe();
      }
    );
  }

  ngOnInit(): void {

    this.paymentService.currentCardDataListSource.subscribe(
      (data: any) => {
        console.log(data);
        this.cardlist = data.resultList;
      });

    this.paymentService.getUsersAllCards().subscribe();
  }

  openDialog(formType: any): void {
    this.dialog.open(AddNewCardComponent, { panelClass: 'custom-dialog-container', data: { formType, cardId: '0' } });
  }

  openEditDialog(formType: any, cardId): void {
    this.dialog.open(AddNewCardComponent, { panelClass: 'custom-dialog-container', data: { formType, cardId } });
  }

}
