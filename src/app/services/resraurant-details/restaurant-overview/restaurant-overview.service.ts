import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantOverviewService {

  apiBaseUrl = environment.baseUrl;
  overviewDataListSource = new BehaviorSubject({});
  currentoverviewDataListSource = this.overviewDataListSource.asObservable();
  currentOverview: any;

  restaurantName = new BehaviorSubject('');
  restaurantNameObserver = this.overviewDataListSource.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getRestaurantOverview = (restaurantID): Observable<any> => {
    const url = `${this.apiBaseUrl}restaurants/getRestaurantById`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurantId', restaurantID);

    return this.httpClient.get<any[]>(url, {params: httpParams})
      .pipe(
        tap((data: any) => {
          this.restaurantName.next(data.restaurant_name);
          this.currentOverview = { ...data };
          this. overviewDataListSource.next(data);
        }),
        retry(3)
      );
  }

  getRestaurantDetails = (restaurantId) => {
    const url = `${this.apiBaseUrl}restaurants/getRestaurantById`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurantId', restaurantId);

    return this.httpClient.get<any[]>(url, {params: httpParams})
      .pipe(
        tap((data: any) => {
        }),
        retry(3)
      );
  }
}
