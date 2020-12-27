import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiBaseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCartData = (orderNumber): Observable<any> => {
    console.log(orderNumber);
    const url = `${this.apiBaseUrl}orders/getAllOrders`;

    let httpParams = new HttpParams();
    httpParams = httpParams.append('orderNumber', "3630212");
    console.log(httpParams);

    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }
}
