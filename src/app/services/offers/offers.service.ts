import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  apiBaseUrl = environment.baseUrl;
  offersDataListSource = new BehaviorSubject({});
  currentOffersDataListSource = this.offersDataListSource.asObservable();
  currentOffersDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getRestaurantOffers = (restaurantID): Observable<any> => {
    console.log(restaurantID);
    const url = `${this.apiBaseUrl}offers/getOfferById`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurantId', restaurantID);

    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap((data: any) => {
          this.currentOffersDataList = { ...data };
          this.offersDataListSource.next(data);
        }),
        retry(3)
      );
  }

  getOffersById = (offerId): Observable<any> => {
    console.log(offerId);
    const url = `${this.apiBaseUrl}offers/getOfferById`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('offerId', offerId);

    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap((data: any) => {
        }),
        retry(3)
      );
  }
}
