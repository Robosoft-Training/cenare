import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewCardComponent } from '../add-new-card/add-new-card.component';

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

  cardlist: any = [
    {
      icon: 'assets/images/visa_icon.png',
      cardNumber: '2345 XXXX XXXX 6574',
      cardName: 'Visa',
    },
    {
      icon: 'assets/images/mastercard_icon.png',
      cardNumber: '1234 XXXX XXXX 3456',
      cardName: 'Master card',
    }
  ];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog(formType: any): void {
    this.dialog.open(AddNewCardComponent, { panelClass: 'custom-dialog-container', data: { formType } });
  }

}
