import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = environment.baseUrl;
  userEmail = new BehaviorSubject('');
  currentUserEmail = this.userEmail.asObservable();
  userName = new BehaviorSubject('');
  currentUserName = this.userName.asObservable();

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  registerEmail = (email): Observable<any[]> => {
    console.log(email);
    const postBody = {
      email
    };
    this.localStorageService.setUserEmail(email);
    const url = `${this.baseUrl}api/auth/signup`;
    return this.httpClient.post<any[]>(url, postBody, this.httpOptions).pipe(
      tap(
        (data: any) => {
          this.localStorageService.setUserEmail(data.email);
        }
      )
    );
  }

  createAccount = (firstName, lastName, mobileNumber, password): Observable<any[]> => {
    const email = this.localStorageService.getUserEmail();
    const userId = this.localStorageService.getUserId();
    const postBody = {
      country_code: '91',
      email,
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNumber,
      password: password,
      user_id: userId
    };
    console.log(postBody);
    const url = `${this.baseUrl}api/auth/updateUser`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data: any) => {
          console.log(data);
          this.userEmail.next(data.email);
          this.userName.next(data.first_name);
        }
      )
    );
  }
}
