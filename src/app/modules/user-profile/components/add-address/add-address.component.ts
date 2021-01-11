import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  city = { value: '', error: '' };
  area = { value: '', error: '' };
  address = { value: '', error: '' };
  addressLabel = { value: '', error: '' };

  constructor(
    public dialogRef: MatDialogRef<AddAddressComponent>,
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveAddress(): void {
    if (!this.city.value) {
      this.city.error = 'City is required';
    }
    else if (!this.area.value) {
      this.area.error = 'Area is required';
    }
    else if (!this.address.value) {
      this.address.error = 'Address is required';
    }
    else if (!this.addressLabel.value) {
      this.addressLabel.error = 'Address label is required';
    }
    else {
      this.city.error = '';
      this.area.error = '';
      this.address.error = '';
      this.addressLabel.error = '';
    }
  }
}