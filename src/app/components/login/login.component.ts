import { Input } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  @Input() formType: string = 'login';
  type = 'password';
  email = { value: '', error: '' };
  password = { value: '', error: '' };
  firstName = { value: '', error: '' };
  lastName = { value: '', error: '' };
  constructor(private route: Router, public dialogRef: MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public data: { formType: string }) { this.formType = data.formType; }
  ngOnInit(): void { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  togglePassword(): void {
    if (this.type === 'password') {
      this.type = 'text';
    }
    else {
      this.type = 'password';
    }
  }
  showFormType(formName): void {
    this.formType = formName;
  }
  verify(): void {
    if (!this.email.value) {
      this.email.error = 'Email is required';
    }

    else {
      this.email.error = '';
      this.showFormType('otpverification');

    }
  }

  verifylogin(): void {
    if (!this.email.value) {
      this.email.error = 'Email is required';
    }
    else if (!this.password.value) {
      this.password.error = 'Password is required';
    }
    else {
      this.email.error = '';
      this.password.error = '';
    }

  }
  createAccount(): void {
    if (!this.email.value) {
      this.email.error = 'Email is required';
    }

    else {
      this.email.error = '';
      this.showFormType('verification');

    }
  }
  registration(): void {
    if (!this.firstName.value) {
      this.firstName.error = 'First name is required';
    }
    else if (!this.lastName.value) {
      this.lastName.error = 'Last name is required';
    }
    else {
      this.firstName.error = '';
      this.lastName.error = '';
      this.showFormType('successful');
    }

  }
}

