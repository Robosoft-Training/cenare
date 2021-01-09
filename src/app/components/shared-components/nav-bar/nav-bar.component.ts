import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { LoginService } from 'src/app/services/authentication/login.service';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() pageName: any;
  cartCount = 0;
  isLoggedIn = false;
  userName = '';

  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    private router: Router,
    private userProfileService: UserProfileService,
  ) { }

  openDialog(formType: any): void {
    this.dialog.open(LoginComponent, { panelClass: 'custom-dialog-container', data: { formType } });
  }

  logout = () => {
    this.cartCount = 0;
    this.loginService.userLogout();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element!.clientHeight && this.pageName === 'home') {
      element!.classList.add('navbar-inverse');
      element!.classList.remove('navbar-style');
    }
    else if (this.pageName === 'home') {
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

  gotoProfile = () => {
    this.router.navigate(['/user-profile']);
  }

  loadData = () => {
    if (this.isLoggedIn) {
      this.userProfileService.getUserOrders().subscribe(
        (data: any) => {
          this.cartCount = data.noOfItems;
        }
      )
    }
  }

  gotoCart = () => {
    this.router.navigate(['/payment']);
  }

  ngOnInit(): void {
    if (this.pageName === 'home') {
      $('.navbar').removeClass('navbar-inverse');
      $('.navbar').addClass('navbar-style');
      $('.cart-place').removeClass('after-scroll');
      $('.cart-place').addClass('before-scroll');
      // console.log(this.pageName);
    }

    this.loginService.currentUserName.subscribe(
      userName => {
        this.userName = userName;
      }
    );

    this.loginService.isCurrentUserLogin.subscribe(
      (isLogin: any) => {
        this.isLoggedIn = isLogin;
        if (this.isLoggedIn) {
          this.loadData();
        }
      }
    );

    this.loginService.isUserLoggedIn();
    this.loadData();
  }
}
