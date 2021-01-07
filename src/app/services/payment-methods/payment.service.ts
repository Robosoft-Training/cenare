import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiBaseUrl = environment.baseUrl
  constructor(private httpClient: HttpClient) { }
  addCard = (card_number, expiry_month, expiry_year, name_on_card, security_card): Observable<any> => {
    console.log(card_number, expiry_month, expiry_year, name_on_card, security_card);
    const url = `${this.apiBaseUrl}payments/addCard`;
    const postBody = {
      card_number,
      expiry_month,
      expiry_year,
      name_on_card,
      security_card
    };
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }
  deleteCard = (user_card_id): Observable<any> => {
    console.log(user_card_id);
    const url = `${this.apiBaseUrl}payments/deleteCard`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('user_card_id', user_card_id);
    return this.httpClient.delete<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }
  editPaymentCard = (card_image, card_number, expiry_month, expiry_year, name_on_card, primary_card, security_card, user_card_id, user_id): Observable<any> => {
    console.log(card_image, card_number, expiry_month, expiry_year, name_on_card, primary_card, security_card, user_card_id, user_id);
    const url = `${this.apiBaseUrl}payments/editPaymentCard`;
    const putBody = {
      card_image,
      card_number,
      expiry_month,
      expiry_year,
      name_on_card,
      primary_card,
      security_card,
      user_card_id,
      user_id
    };
    return this.httpClient.put<any[]>(url, putBody)
      .pipe(
        tap(data => {
          // console.log(data);
        }),
        retry(3)
      );
  }
  updatePrimaryCard = (user_card_id): Observable<any> => {
    console.log(user_card_id);
    const url = `${this.apiBaseUrl}payments/updatePrimaryCard`;
    const putBody = {
    };
    return this.httpClient.put<any[]>(url, putBody)
      .pipe(
        tap(data => {
          // console.log(data);
        }),
        retry(3)
      );
  }
  getPrimaryCard = (): Observable<any> => {
    const url = `${this.apiBaseUrl}payments/getPrimaryCard`;
    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          // console.log(data);
        }),
        retry(3)
      );
  }
  getUsersAllCards = (): Observable<any> => {
    const url = `${this.apiBaseUrl}payments/getAllCards`;
    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          // console.log(data);
        }),
        retry(3)
      );
  }
  getCardById = (cardId): Observable<any> => {
    console.log(cardId);
    const url = `${this.apiBaseUrl}payments/getCardById`;
    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          // console.log(data);
        }),
        retry(3)
      );
  }
  paywithTemporaryCard = (amount, orderNumber) => {
    console.log(amount, orderNumber);
    const url = `${this.apiBaseUrl}payments/oneTimePaymentCard?=${orderNumber}`;
    const postBody = {
    };
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }
  payNow = (amount, card_number, cvv, orderNumber): Observable<any> => {
    console.log(amount, card_number, cvv, orderNumber);
    const url = `${this.apiBaseUrl}payments/payForOrder`;
    const postBody = {
      amount,
      card_number,
      cvv,
      orderNumber
    };
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }
}
