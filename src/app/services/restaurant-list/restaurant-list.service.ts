import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';
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

  searchRestaurants = (searchDetails, coordinates): Observable<any[]> => {
    this.coordinatesData = coordinates;
    let cityName = this.coordinatesData.results[0].address.municipality
    console.log(this.coordinatesData.results[0]);
    this.searchDetails = { ...searchDetails };
    this.dataListSource.next(this.searchDetails);
    this.localStorageService.setUserSearchDetails(this.searchDetails);
    this.localStorageService.setUserCoordinates(coordinates);

    // const date = this.getDate(searchDetails.dateTime);
    let httpParams = new HttpParams();
    httpParams = httpParams.append('longitude', this.coordinatesData.results[0].position.lat);
    httpParams = httpParams.append('latitude', this.coordinatesData.results[0].position.lon);
    httpParams = httpParams.append('city', cityName);
    httpParams = httpParams.append('searchBy', searchDetails.searchName);
    // httpParams = httpParams.append('date', date);

    const url = `${this.baseUrl}restaurants/getNearByRestaurants`;
    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
          console.log(data);
          this.currentretaurantDataList = { ...data };
          this.retaurantDataListSource.next(this.currentretaurantDataList);
        }),
        retry(3)
      );
  }

  loadRestaurants = () => {
    this.searchData = this.localStorageService.getUserSearchDetails();
    this.searchData = JSON.parse(this.searchData);
    this.coordinatesData = this.localStorageService.getUserCoordinates();
    this.coordinatesData = JSON.parse(this.coordinatesData);
    this.searchRestaurants(this.searchData, this.coordinatesData).subscribe(
      res => {
        // console.log(res);
      }
    );
  }

  filterRetaurants = (filterData: any) => {

    this.searchData = this.localStorageService.getUserSearchDetails();
    this.searchData = JSON.parse(this.searchData);
    this.coordinatesData = this.localStorageService.getUserCoordinates();
    this.coordinatesData = JSON.parse(this.coordinatesData);

    const date = this.getDate(this.searchDetails.dateTime);
    let httpParams = new HttpParams();

    // Appending Loaction and Search by
    httpParams = httpParams.append('latitude', this.coordinatesData.results[0].position.lat);
    httpParams = httpParams.append('longitude', this.coordinatesData.results[0].position.lon);
    httpParams = httpParams.append('city', this.searchData.locationName);
    httpParams = httpParams.append('searchBy', this.searchData.searchName);

    // Appending filterdata
    httpParams = httpParams.append('openNow', filterData.openNow);
    httpParams = httpParams.append('deliveryIn', filterData.delivery);
    httpParams = httpParams.append('avgMealCoast', filterData.averageCost);
    httpParams = httpParams.append('minOrder', filterData.minimumCost);
    httpParams = httpParams.append('cuisine', filterData.cuisine);
    httpParams = httpParams.append('date', date);

    const url = `${this.baseUrl}/restaurantList/filter`;
    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
          this.currentretaurantDataList = { ...data };
          this.retaurantDataListSource.next(this.currentretaurantDataList);
        }),
        retry(3)
      );
  }
}
