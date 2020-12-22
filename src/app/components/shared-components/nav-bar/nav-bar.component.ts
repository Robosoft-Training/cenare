import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as $ from 'jquery';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() pageName: any;

  isLoggedIn = false;
  userName = 'ASHLEY';

  constructor(public dialog: MatDialog) { }

  openDialog(formType: any): void {
    this.dialog.open(LoginComponent, { panelClass: 'custom-dialog-container', data: { formType } });
  }

  ngOnInit(): void {
    if (this.pageName === 'home') {
      $('.navbar').removeClass('navbar-inverse');
      $('.navbar').addClass('navbar-style');
      $('.cart-place').removeClass('after-scroll');
      $('.cart-place').addClass('before-scroll');
      console.log(this.pageName);
    }
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e: any) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element!.clientHeight && this.pageName === 'home') {
      element!.classList.add('navbar-inverse');
      element!.classList.remove('navbar-style');
    }
    else if (this.pageName === 'home'){
      element!.classList.remove('navbar-inverse');
      element!.classList.add('navbar-style');
    }

    element = document.querySelector('.cart-place');
    if (window.pageYOffset > element!.clientHeight && this.pageName === 'home') {
      element!.classList.add('after-scroll');
      element!.classList.remove('before-scroll');
    }
    else if (this.pageName === 'home') {
      element!.classList.remove('after-scroll');
      element!.classList.add('before-scroll');
    }
  }

}
