import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MenuListService {

  // searchData: any;
  apiBaseUrl = environment.baseUrl;

  menuDataListSource = new BehaviorSubject({});
  currentMenuDataListSource = this.menuDataListSource.asObservable();
  currentMenuDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getRestaurantMenuItems = (restaurantID): Observable<any> => {
    console.log(restaurantID);
    const url = `${this.apiBaseUrl}getMenu`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurant_id', restaurantID);

    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          this.currentMenuDataList = { ...data };
          this.menuDataListSource.next(this.currentMenuDataList);
        }),
        retry(3)
      );
  }

  getRestaurantMenuItemsBySearch = (restaurantID, searchData): Observable<any> => {

    const url = `${this.apiBaseUrl}getMenu/search`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurant_id', restaurantID);
    httpParams = httpParams.append('searchData', searchData);

    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          this.currentMenuDataList = { ...data };
          this.menuDataListSource.next(this.currentMenuDataList);
        }),
        retry(3)
      );
  }

}
