import { Input } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/authentication/login.service';
import { OtpverificationService } from 'src/app/services/authentication/otpverification.service';
import { RegisterService } from 'src/app/services/authentication/register.service';
import { ResetPasswordService } from 'src/app/services/authentication/reset-password.service';

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

  userName: any;
  userEmail: any;

  matcher = new MyErrorStateMatcher();
  @Input() formType: string = 'login';
  type = 'password';
  email = { value: '', error: '' };
  password = { value: '', error: '' };
  newPassword1 = { value: '', error: '' };
  newPassword2 = { value: '', error: '' };
  firstName = { value: '', error: '' };
  lastName = { value: '', error: '' };
  mobileNumber = { value: '', error: '' };
  otp = { value: '', error: '' };

  constructor(
    private loginService: LoginService,
    private registerService: RegisterService,
    private otpVerifications: OtpverificationService,
    private resetPasswordService: ResetPasswordService,
    private router: Router,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    public data: { formType: string }
  ) { this.formType = data.formType; }

  ngOnInit(): void { 
    this.registerService.currentUserName.subscribe(
      userName => {
        this.userName = userName;
      }
    );
    this.registerService.currentUserEmail.subscribe(
      userEmail => {
        this.userEmail = userEmail;
      }
    );
  }

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
    this.password.value = "";
    this.formType = formName;
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
      this.loginService.userLogin(this.email.value, this.password.value).subscribe(
        msg => {
          // this.router.navigate(['/home-page']);
          // location.reload();
          this.closeDialog();
        },
        err => {
          this.email.error = 'Email and Password not Matching';
        }
      );
    }
  }

  createAccount(): void {
    if (!this.email.value) {
      this.email.error = 'Email is required';
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email.value))) {
      this.email.error = 'Enter valid Email';
    }
    else {
      this.email.error = '';
      this.registerService.registerEmail(this.email.value).subscribe(
        (msg) => {
          this.showFormType('create');
        },
        err => {
          this.email.error = err.error.message;
        }
      );
    }
  }

  registration(): void {
    if (!this.firstName.value) {
      this.firstName.error = 'First name is required';
    }
    else if (!this.lastName.value) {
      this.lastName.error = 'Last name is required';
    }
    else if (!this.password.value) {
      this.password.error = 'Password is required';
    }
    else {
      this.firstName.error = '';
      this.lastName.error = '';
      this.registerService.createAccount(this.firstName.value, this.lastName.value, this.mobileNumber.value, this.password.value).subscribe(
        msg => {
          this.showFormType('successful');
        },
        err => {
          this.email.error = 'Something went wrong!';
        }
      );
    }
  }

  verifyOtpForCreatingAccount = () => {
    this.otpVerifications.verifyOtp(this.otp.value).subscribe(
      msg => {
        this.showFormType('verification');
      },
      err => {
        this.otp.error = 'Invalied OTP';
      }
    );
  }

  verify(): void {
    if (!this.email.value) {
      this.email.error = 'Email is required';
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email.value))) {
      this.email.error = 'Enter valid Email';
    }
    else {
      this.email.error = '';
      this.resetPasswordService.resetPassWordSendOtp(this.email.value).subscribe(
        msg => {
          this.showFormType('otpverification');
        },
        err => {
          this.email.error = 'Something went wrong!';
        }
      );
    }
  }

  resetPassword = () => {
    if (!(this.newPassword1.value === this.newPassword2.value)) {
      this.newPassword1.error = 'Password not matching';
    }
    else {
      this.newPassword1.error = '';
      this.resetPasswordService.resetPassword(this.newPassword1.value).subscribe(
        msg => {
          this.showFormType('login');
        },
        err => {
          this.otp.error = 'Something went wrong!';
        }
      );
    }
  }

  verifyOtpForResetPassword = () => {
    this.otpVerifications.verifyOtpForResetPassword(this.otp.value).subscribe(
      msg => {
        this.showFormType('verified');
      },
      err => {
        this.otp.error = 'Invalied OTP';
      }
    );
  }
}

