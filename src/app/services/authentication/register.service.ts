import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  registerEmail = (email): Observable<any[]> => {
    console.log(email);
    const postBody = {
      email
    };
    this.localStorageService.setUserEmail(email);
    const url = `${this.baseUrl}register/sendotp`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data) => {

        }
      )
    );
  }

  createAccount = (firstName, lastName, mobileNumber, password): Observable<any[]> => {
    const email = this.localStorageService.getUserEmail();
    const postBody = {
      email,
      firstName,
      lastName,
      mobileNumber,
      password
    };
    console.log(postBody);
    const url = `${this.baseUrl}register`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data) => {

        }
      )
    );
  }
}
