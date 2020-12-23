import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantOverviewService {

  apiBaseUrl = environment.baseUrl;
  currentOverview: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getRestaurantOverview = (restaurantID): Observable<any> => {
    console.log(restaurantID);
    const url = `${this.apiBaseUrl}getOverView`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurant_id', restaurantID);

    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          this.currentOverview = { ...data };
        }),
        retry(3)
      );
  }
}
