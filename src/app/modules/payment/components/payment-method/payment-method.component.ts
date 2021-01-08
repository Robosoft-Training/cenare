import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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

  cardNumberFormControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]);
  nameOnCardFormControl = new FormControl('', Validators.required);
  expiryMonthFormControl = new FormControl('', [Validators.required,Validators.pattern('[0-9]{2}')]);
  expiryYearFormControl = new FormControl('', [Validators.required,Validators.pattern('[0-9]{4}')]);
  securityCodeFormControl = new FormControl('', [Validators.required,Validators.pattern('[0-9]{3}')]);

  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }


}
