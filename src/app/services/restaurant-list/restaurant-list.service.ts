import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';
import { IRestaurant } from 'src/app/shared/interfaces/IRestaurant_List';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantListService {

  searchDetails = {
    searchName: '',
    locationName: '',
    dateTime: ''
  };
  searchData: any;
  coordinatesData: any;
  baseUrl = environment.baseUrl;

  dataListSource = new BehaviorSubject({});
  currentDataList = this.dataListSource.asObservable();

  retaurantDataListSource = new BehaviorSubject({});
  currentretaurantDataListSource = this.retaurantDataListSource.asObservable();
  currentretaurantDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getDate = (dateTime) => {
    let date: any = new Date(dateTime);
    date = ((
      date.getMonth() > 8) ?
      date.getFullYear() + '-' + (date.getMonth() + 1) :
      ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() :
        ('0' + date.getDate()));
    return date;
  }

  searchRestaurants = (searchDetails, coordinates): Observable<IRestaurant[]> => {
    this.coordinatesData = coordinates;
    this.localStorageService.setUserSearchDetails(searchDetails);
    this.localStorageService.setUserCoordinates(coordinates);
    this.dataListSource.next(searchDetails);
    const adress = searchDetails.locationName;
    const cityName = adress.replace(/ .*/, '');

    // const date = this.getDate(searchDetails.dateTime);
    let httpParams = new HttpParams();
    httpParams = httpParams.append('latitude', this.coordinatesData.results[0].position.lat);
    httpParams = httpParams.append('longitude', this.coordinatesData.results[0].position.lon);
    httpParams = httpParams.append('City', cityName);
    httpParams = httpParams.append('SearchBy', searchDetails.searchName);
    // httpParams = httpParams.append('date', date);

    const url = `${this.baseUrl}restaurants/getNearByRestaurants`;
    return this.httpClient.get<IRestaurant[]>(url, { params: httpParams })
      .pipe(
        tap((data: IRestaurant[]) => {
          this.currentretaurantDataList = {...data}
          this.retaurantDataListSource.next(data);
        }),
        retry(3)
      );
  }

  loadRestaurants = (): Observable<IRestaurant[]> => {
    this.searchData = this.localStorageService.getUserSearchDetails();
    this.searchData = JSON.parse(this.searchData);
    this.coordinatesData = this.localStorageService.getUserCoordinates();
    this.coordinatesData = JSON.parse(this.coordinatesData);
    const adress = this.searchData.locationName;
    const cityName = adress.replace(/ .*/, '');
    let httpParams = new HttpParams();
    httpParams = httpParams.append('latitude', this.coordinatesData.results[0].position.lat);
    httpParams = httpParams.append('longitude', this.coordinatesData.results[0].position.lon);
    httpParams = httpParams.append('City', cityName);
    httpParams = httpParams.append('SearchBy', this.searchData.searchName);
    const url = `${this.baseUrl}restaurants/getNearByRestaurants`;
    return this.httpClient.get<IRestaurant[]>(url, { params: httpParams })
      .pipe(
        tap((data: IRestaurant[]) => {
          this.currentretaurantDataList = {...data}
          this.retaurantDataListSource.next(data);
        }),
        retry(3)
      );
  }

  filterRetaurants = (filterData: any) => {

    console.log(filterData);

    const date = this.getDate(this.searchDetails.dateTime);
    let httpParams = new HttpParams();

    // Appending filterdata
    // httpParams = httpParams.append('openNow', filterData.openNow);
    httpParams = httpParams.append('Time', filterData.delivery);
    httpParams = httpParams.append('avgCost', filterData.averageCost);
    httpParams = httpParams.append('minimumCost', filterData.minimumCost);
    // httpParams = httpParams.append('cuisine', filterData.cuisine);
    // httpParams = httpParams.append('date', date);

    const url = `${this.baseUrl}restaurants/getFilteredRestaurants`;
    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
          this.currentretaurantDataList = {...data}
          this.retaurantDataListSource.next(data);
        }),
        retry(3)
      );
  }
}
