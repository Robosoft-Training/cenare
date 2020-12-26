import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  resetPassWordSendOtp = (email): Observable<any[]> => {
    // console.log(email);
    const postBody = {};
    this.localStorageService.setUserEmail(email);
    const url = `${this.baseUrl}api/auth/forgotPassword?email=${email}`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data) => {
          // console.log(data);
        }
      )
    );
  }

  resetPassword = (password): Observable<any[]> => {
    const email = this.localStorageService.getUserEmail();
    const postBody = {
      password
    };
    // console.log(postBody);
    const url = `${this.baseUrl}api/auth/changePassword?email=${email}`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data) => {

        }
      )
    );
  }
}
