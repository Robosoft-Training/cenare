import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  nextFormRequest = new BehaviorSubject('');
  nextFormRequestObserver = this.nextFormRequest.asObservable();

  constructor() { }

  chooseAdress = () => {
    this.nextFormRequest.next('paymet-methods');
  }
}
