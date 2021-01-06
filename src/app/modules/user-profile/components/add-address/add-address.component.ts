import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  form!: FormGroup;
  myCity = "";

  constructor(
    public dialogRef: MatDialogRef<AddAddressComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      city: ['', Validators.required]
    //  phone_number: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10)]]
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveAddress() {

  }

  get city() {
    return this.form.get('city');
    }

}
