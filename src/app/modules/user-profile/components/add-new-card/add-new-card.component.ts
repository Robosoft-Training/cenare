import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from 'src/app/services/payment-methods/payment.service';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.scss']
})

export class AddNewCardComponent implements OnInit {

  cvv = { value: '', error: '' };
  name = { value: '', error: '' };
  cardNumber = { value: '', error: '' };
  expiryMonth: any = { value: '', error: '' };
  expiryYear: any = { value: '', error: '' };

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;

  constructor(
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<AddNewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formType: string, cardId: string }
  ) { }

  ngOnInit(): void {
    if (this.data.cardId !== '0') {
      this.paymentService.getCardById(this.data.cardId).subscribe(
        data => {
          this.cvv.value = data.security_card;
          this.name.value = data.name_on_card;
          this.cardNumber.value = data.card_number;
          this.expiryMonth.value = data.expiry_month;
          this.expiryYear.value = data.expiry_year;
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCard(): void {
    if (!this.cardNumber.value) {
      this.cardNumber.error = 'Card number is required';
    }
    else if (!this.name.value) {
      this.name.error = 'Name is required';
    }
    else if (!this.expiryMonth.value) {
      this.expiryMonth.error = 'Please enter month';
    }
    else if (!this.expiryYear.value) {
      this.expiryYear.error = 'Please enter year';
    }
    else if (!this.cvv.value) {
      this.cvv.error = 'Please enter CVV';
    }
    else if (this.expiryMonth.value < 1 || this.expiryMonth.value > 12) {
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
      if (this.data.cardId === '0') {
        this.paymentService.addCard(this.cardNumber.value, this.expiryMonth.value, this.expiryYear.value, this.name.value, this.cvv.value).subscribe(
          msg => {
            this.paymentService.getUsersAllCards().subscribe();
          }
        );
      }
      else {
        this.paymentService.editPaymentCard(this.data.cardId, this.cardNumber.value, this.expiryMonth.value, this.expiryYear.value, this.name.value, this.cvv.value).subscribe(
          msg => {
            this.paymentService.getUsersAllCards().subscribe();
          }
        );
      }
    }
  }

}