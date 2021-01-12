import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<AddNewCardComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCard(): void {
    console.log(this.currentMonth);
    console.log(this.currentYear);
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
      this.paymentService.addCard(this.cardNumber.value, this.expiryMonth.value, this.expiryYear.value, this.name.value, this.cvv.value).subscribe(
        msg => {
          this.paymentService.getUsersAllCards().subscribe();
        }
      );
    }
  }

}