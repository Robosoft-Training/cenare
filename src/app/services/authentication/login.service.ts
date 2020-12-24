import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  isAuthenticated = false;

  userName = new BehaviorSubject('');
  currentUserName = this.userName.asObservable();
  isUserLogin = new BehaviorSubject(false);
  isCurrentUserLogin = this.userName.asObservable();

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  userLogin = (email, password): Observable<any[]> => {
    console.log(email, password);
    const postBody = {
      email,
      password
    };
    const url = `${this.baseUrl}login`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data) => {
          this.localStorageService.setUserJWTtoken('JWT');
          this.localStorageService.setUserName('USER_NAME');
          this.userName.next('USER_NAME');
          this.isUserLogin.next(true);
          this.isAuthenticated = true;
        }
      )
    );
  }

  isUserLoggedIn = (): void => {
    if (this.localStorageService.getUserJWTtoken()) {
      this.userName.next('USER_NAME');
      this.isAuthenticated = true;
      this.isUserLogin.next(true);
    }
  }

  userLogout = () => {
    localStorage.removeItem('crave-userJWTtokens');
    localStorage.removeItem('crave-userName');
    localStorage.removeItem('crave-userEmail');
    this.userName.next('');
    this.isAuthenticated = false;
    this.isUserLogin.next(false);
  }

}
