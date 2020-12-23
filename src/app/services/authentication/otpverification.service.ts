import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OtpverificationService {

  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  verifyOtp = (otp) => {
    const email = this.localStorageService.getUserEmail();
    console.log(otp, email);
    const postBody = {
      email: email,
      otp: otp
    };
    const url = `${this.baseUrl}otpverify`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data) => {

        }
      )
    );
  } 
}
