import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantOverviewService {

  apiBaseUrl = environment.baseUrl;
  overviewDataListSource = new BehaviorSubject({});
  currentoverviewDataListSource = this.overviewDataListSource.asObservable();
  currentOverview: any;
  

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getRestaurantOverview = (restaurantID): Observable<any> => {
    console.log(restaurantID);
    const url = `${this.apiBaseUrl}restaurants/getRestaurantById`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurantId', restaurantID);

    return this.httpClient.get<any[]>(url, {params: httpParams})
      .pipe(
        tap(data => {
          this.currentOverview = { ...data };
          this. overviewDataListSource.next(data);
        }),
        retry(3)
      );
  }
}
