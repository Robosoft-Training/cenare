import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiBaseUrl = environment.baseUrl;
  nextFormRequest = new BehaviorSubject('cartItems');
  nextFormRequestObserver = this.nextFormRequest.asObservable();

  constructor(private httpClient: HttpClient) { }

  chooseAdress = (nextForm) => {
    this.nextFormRequest.next(nextForm);
  }

  // applyOffer = (code, orderId) => {
  //   console.log(code, orderId);
  //   const url = `${this.apiBaseUrl}userAddress/addAddress`;
  //   const postBody = {
  //     code,
  //     order
  //   };
  //   return this.httpClient.post<any[]>(url, postBody)
  //     .pipe(
  //       tap(data => {
  //         console.log(data);
  //       }),
  //       retry(3)
  //     );
  // }
}
