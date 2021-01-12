import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDealsOffers } from 'src/app/shared/interfaces/IDealsOffers';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealsOffersService {

  // apiBaseUrl = environment.awsBaseUrl;
  apiBaseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getDealsOffers = (): Observable<IDealsOffers[]> => {
    const url = `${this.apiBaseUrl}offers/getAllOffers`;
    return this.httpClient.get<IDealsOffers[]>(url)
      .pipe(
        tap(_ => console.log('Items Fetched')),
        retry(3)
      );
  }

  getValiedDealsOffers = (orderNumber): Observable<any[]> => {
    const url = `${this.apiBaseUrl}validity/getValidOffers`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('currentDate', new Date().toISOString().slice(0, 10));
    httpParams = httpParams.append('orderNumber', orderNumber);
    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => console.log(data)),
        retry(3)
      );
  }

  applyOfferCode = (code, orderNumber): Observable<any[]> => {
    const url = `${this.apiBaseUrl}validity/checkOfferValidity`;
    const postBody = {
      code,
      orderNumber,
      currentDate: new Date().toISOString().slice(0, 10)
    }
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {}),
        retry(3)
      );
  }

}
