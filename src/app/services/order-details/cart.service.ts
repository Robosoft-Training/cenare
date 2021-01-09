import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiBaseUrl = environment.baseUrl;
  progressStage = new BehaviorSubject('');
  progressStageObserver = this.progressStage.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  addToCart = (orderNumber, restaurantId, menuId): Observable<any> => {
    // console.log(orderNumber);
    const url = `${this.apiBaseUrl}orders/addOrder?orderNumber=${orderNumber}`;
    const postBody = {
      menuId,
      restaurantId
    };
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

  addToCartAgain = (orderNumber, restaurantId, menuId, quantity): Observable<any> => {
    console.log(quantity);
    const url = `${this.apiBaseUrl}orders/addOrderAgain?orderNumber=${orderNumber}`;
    const putBody = {
      menuId,
      quantity,
      restaurantId
    };
    return this.httpClient.put<any[]>(url, putBody)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

  getAllCartData = (orderNumber): Observable<any> => {
    console.log(orderNumber);
    const url = `${this.apiBaseUrl}orders/getAllOrders`;

    let httpParams = new HttpParams();
    httpParams = httpParams.append('orderNumber', orderNumber);

    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

  getTotalAmmount = (orderNumber) => {
    console.log(orderNumber);
    const url = `${this.apiBaseUrl}orders/TotalAmount?orderNumber=${orderNumber}`;
    const postBody = {
    };
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

  removeItem = (orderNumber, menuId): Observable<any> => {
    console.log(orderNumber);
    const url = `${this.apiBaseUrl}orders/removeItem`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('menuId', menuId);
    httpParams = httpParams.append('orderNumber', orderNumber);
    return this.httpClient.delete<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

  clearCart = (orderNumber): Observable<any> => {
    console.log(orderNumber);
    const url = `${this.apiBaseUrl}orders/clearCart?orderNumber=${orderNumber}`;
    return this.httpClient.delete<any[]>(url)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

  addCoockingInstructions = (cookingInstruction, orderNumber) => {
    const url = `${this.apiBaseUrl}orders/addCookingInstruction`;
    const postBody = {
      cookingInstruction,
      orderNumber
    };
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

  progressUpdate = (stageNo) => {
    this.progressStage.next(stageNo);
  }
}
