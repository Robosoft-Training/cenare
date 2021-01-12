import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginComponent } from '../components/shared-components/login/login.component';
import { LoginService } from '../services/authentication/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let formType = 'login';
    if (!this.loginService.isUserLoggedIn()) {
      this.dialog.open(LoginComponent, { panelClass: 'custom-dialog-container', data: { formType } });
      return false;
    }
    return true;
  }
}
