import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  nextFormRequest = new BehaviorSubject('cartItems');
  nextFormRequestObserver = this.nextFormRequest.asObservable();

  constructor() { }

  chooseAdress = (nextForm) => {
    this.nextFormRequest.next(nextForm);
  }
}
