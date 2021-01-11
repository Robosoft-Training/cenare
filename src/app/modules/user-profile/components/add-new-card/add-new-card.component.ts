import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.scss']
})
export class AddNewCardComponent implements OnInit {

  cvv = { value: '', error: '' };
  name = { value: '', error: '' };
  cardNumber = { value: '', error: '' };
  expiryMonth = { value: '', error: '' };
  expiryYear = { value: '', error: '' };

  constructor(
    public dialogRef: MatDialogRef<AddNewCardComponent>
  ) { }

  ngOnInit(): void {
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
      this.cvv.error = 'Please enter correct CVV';
    }
    else {
      this.name.error = '';
      this.cardNumber.error = '';
      this.expiryMonth.error = '';
      this.expiryYear.error = '';
      this.cvv.error = '';
    }
  }

  // credit(event) {
  //   this.cardNumber.value+=" "
  //   console.log(event.target.value);
  // }
}