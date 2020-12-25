import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  
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
    const url = `${this.baseUrl}api/auth/signin`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data:any) => {
          console.log(data.token);
          this.localStorageService.setUserJWTtoken(data.token);
          this.localStorageService.setUserName(data.first_name);
          this.userName.next(data.first_name.toString());
          this.isUserLogin.next(true);
          this.isAuthenticated = true;
        }
      )
    );
  }

  isUserLoggedIn = (): void => {
    if (this.localStorageService.getUserJWTtoken()) {
      let userName: any = this.localStorageService.getUserName()
      this.userName.next(userName.toString());
      this.isAuthenticated = true;
      this.isUserLogin.next(true);
    }
  }

  userLogout = () => {
    localStorage.removeItem('crave-userJWTtokens');
    localStorage.removeItem('crave-userName');
    localStorage.removeItem('crave-userEmail');
    localStorage.removeItem('crave-userId');
    this.userName.next('');
    this.isAuthenticated = false;
    this.isUserLogin.next(false);
  }

}
