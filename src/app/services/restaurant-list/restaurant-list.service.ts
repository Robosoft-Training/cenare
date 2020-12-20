import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';
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
  baseUrl = 'http://192.168.225.87:3000/reataurantList';

  dataListSource = new BehaviorSubject({});
  currentDataList = this.dataListSource.asObservable();

  retaurantDataListSource = new BehaviorSubject({});
  currentretaurantDataListSource = this.retaurantDataListSource.asObservable();
  currentretaurantDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  searchRestaurants = (searchDetails, coordinates): Observable<any[]> => {
    this.coordinatesData = coordinates;
    this.searchDetails = { ...searchDetails };
    this.dataListSource.next(this.searchDetails);
    this.localStorageService.setUserSearchDetails(this.searchDetails);
    this.localStorageService.setUserCoordinates(coordinates);

    let httpParams = new HttpParams();
    httpParams = httpParams.append('latitude', this.coordinatesData.results[0].position.lat);
    httpParams = httpParams.append('longitude', this.coordinatesData.results[0].position.lon);
    httpParams = httpParams.append('city', searchDetails.locationName);
    httpParams = httpParams.append('searchBy', searchDetails.searchName);

    const url = `${this.baseUrl}`;
    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
          this.currentretaurantDataList = { ...data };
          this.retaurantDataListSource.next(this.currentretaurantDataList);
        }),
        retry(3),
        catchError(this.handleError)
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

    let httpParams = new HttpParams();

    // Appending Loaction and Search by
    httpParams = httpParams.append('latitude', this.coordinatesData.results[0].position.lat);
    httpParams = httpParams.append('longitude', this.coordinatesData.results[0].position.lon);
    httpParams = httpParams.append('city', this.searchData.locationName);
    httpParams = httpParams.append('searchBy', this.searchData.searchName);

    // Appending filterdata
    httpParams = httpParams.append('reaturentWith', filterData.reaturentWith);
    httpParams = httpParams.append('deliveryIn', filterData.deliveryIn);
    httpParams = httpParams.append('avgMealCoast', filterData.avgMealCoast);
    httpParams = httpParams.append('minOrder', filterData.minOrder);
    httpParams = httpParams.append('cuisines', filterData.cuisines);

    const url = `${this.baseUrl}/filter`;
    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
          this.currentretaurantDataList = { ...data };
          this.retaurantDataListSource.next(this.currentretaurantDataList);
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error);
  }
}
