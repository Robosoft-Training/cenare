import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiBaseUrl = environment.baseUrl
  constructor(private httpClient: HttpClient) { }

  cardDataListSource = new BehaviorSubject({});
  currentCardDataListSource = this.cardDataListSource.asObservable();

  nextFormRequest = new BehaviorSubject('cartItems');
  nextFormRequestObserver = this.nextFormRequest.asObservable();

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
    console.log(postBody);
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
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

  editPaymentCard = (userCardId, card_number, expiry_month, expiry_year, name_on_card, security_card): Observable<any> => {
    console.log(card_number, expiry_month, expiry_year, name_on_card, security_card);
    const url = `${this.apiBaseUrl}payments/editPaymentCard?userCardId=${userCardId}`;
    const putBody = {
      card_image: "",
      card_number,
      expiry_month,
      expiry_year,
      name_on_card,
      primary_card: false,
      security_card,
      user_card_id: userCardId,
      user_id: 0
    };
    return this.httpClient.put<any[]>(url, putBody)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }

  updatePrimaryCard = (user_card_id): Observable<any> => {
    const url = `${this.apiBaseUrl}payments/updatePrimaryCard?user_card_id=${user_card_id}`;
    const putBody = {
    };
    return this.httpClient.put<any[]>(url, putBody)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

  getPrimaryCard = (): Observable<any> => {
    const url = `${this.apiBaseUrl}payments/getPrimaryCard`;
    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          
        }),
        retry(3)
      );
  }

  getUsersAllCards = (): Observable<any> => {
    const url = `${this.apiBaseUrl}payments/getAllCards`;
    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          this.cardDataListSource.next(data);
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

  chooseAdress(nextForm: any){
    this.nextFormRequest.next(nextForm);
  }

  chooseAddress = (orderNumber, deliveryType, deliveryInstruction, deliveryAddress, name, phoneNumber, countryCode) :Observable<any> => {
    console.log(orderNumber, deliveryType, deliveryInstruction, deliveryAddress, name, phoneNumber, countryCode);
    const url = `${this.apiBaseUrl}orders/addDeliveryDetails`;
    const postBody = {
      order_number: orderNumber, 
      delivery_type: deliveryType, 
      delivery_instruction: deliveryInstruction, 
      delivery_address: deliveryAddress, 
      name: name, 
      phone_number: phoneNumber, 
      country_code: countryCode
    };
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }

  payForOrder = (orderNumber, amount, cvv, card_number):Observable<any> => {
    console.log(orderNumber, amount, cvv, card_number);
    const url = `${this.apiBaseUrl}payments/payForOrder`;
    const postBody = {
      orderNumber,
      amount,
      cvv,
      card_number
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
