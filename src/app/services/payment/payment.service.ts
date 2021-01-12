import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiBaseUrl = environment.baseUrl;
  nextFormRequest = new BehaviorSubject('cartItems');
  nextFormRequestObserver = this.nextFormRequest.asObservable();

  constructor(private httpClient: HttpClient) { }

  chooseAdress(nextForm: any){
    this.nextFormRequest.next(nextForm);
  }
  chooseAddress = (orderNumber, deliveryType, deliveryInstruction, deliveryAddress, name, phoneNumber, countryCode) :Observable<any> => {
    console.log(orderNumber, deliveryType, deliveryInstruction, deliveryAddress, name, phoneNumber, countryCode);
    
    const url = `${this.apiBaseUrl}Deliverydetails/addOrderDeliveryDetails`;
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
  
}
