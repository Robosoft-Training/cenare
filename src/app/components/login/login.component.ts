import { Input } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() formType: string = 'login';
  type = 'password';
  

  constructor(public dialogRef: MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public data: {formType: string}) { 
    this.formType=data.formType;
  }

  ngOnInit(): void {
    
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
    this.formType = formName;
  }
  

  
  }

