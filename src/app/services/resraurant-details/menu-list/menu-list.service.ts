import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { IMenuList } from 'src/app/shared/interfaces/IMenuList';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MenuListService {

  // searchData: any;
  apiBaseUrl = environment.baseUrl;

  restaurantID: any = 0;
  menuDataListSource = new BehaviorSubject({});
  currentMenuDataListSource = this.menuDataListSource.asObservable();
  currentMenuDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getRestaurantMenuItems = (restaurantID): Observable<IMenuList[]> => {
    this.restaurantID = restaurantID;
    this.localStorageService.setRestId(restaurantID);;
    const url = `${this.apiBaseUrl}menu/getMenu`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurant_id', restaurantID);

    return this.httpClient.get<IMenuList[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
          // this.currentMenuDataList = { ...data };
          this.menuDataListSource.next(data);
        }),
        retry(3)
      );
  }

  getRestaurantMenuItemsBySearch = (searchData): Observable<any> => {
    console.log(searchData);
    if (searchData) {
      const url = `${this.apiBaseUrl}menu/getSearchMenu`;
      let httpParams = new HttpParams();
      httpParams = httpParams.append('restaurantId', this.restaurantID);
      httpParams = httpParams.append('itemName', searchData);

      return this.httpClient.get<any[]>(url, { params: httpParams })
        .pipe(
          tap(data => {
            // console.log(data);
          }),
          retry(3)
        );
    }
    else {
      console.log(this.restaurantID);
      const url = `${this.apiBaseUrl}menu/getMenu`;
      let httpParams = new HttpParams();
      httpParams = httpParams.append('restaurant_id', this.restaurantID);
      return this.httpClient.get<any[]>(url, { params: httpParams })
        .pipe(
          tap(data => {
            this.menuDataListSource.next(data);
          }),
          retry(3)
        );
    }
  }
}
