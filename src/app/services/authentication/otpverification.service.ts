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
      email,
      otp
    };
    const url = `${this.baseUrl}api/auth/verifyOtp`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data: any) => {
          this.localStorageService.setUserEmail(data.email);
          this.localStorageService.setUserId(data.user_id);
        }
      )
    );
  }

  verifyOtpForResetPassword = (otp) => {
    const email = this.localStorageService.getUserEmail();
    console.log(otp, email);
    const postBody = {
      email,
      otp
    };
    const url = `${this.baseUrl}api/auth/enterOtp`;
    return this.httpClient.post<any[]>(url, postBody).pipe(
      tap(
        (data: any) => {
          this.localStorageService.setUserEmail(data.email);
          this.localStorageService.setUserId(data.user_id);
        }
      )
    );
  }
}
