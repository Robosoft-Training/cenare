import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    this.searchDetails = { ...searchDetails };
    this.dataListSource.next(this.searchDetails);
    // console.log(coordinates.results[0].position.lat, coordinates.results[0].position.lon);
    this.localStorageService.setUserSearchDetails(this.searchDetails);
    this.localStorageService.setUserCoordinates(coordinates);
    const url = `${this.baseUrl}`;
    return this.httpClient.get<any[]>(url)
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
    this.coordinatesData = this.localStorageService.getUserSearchDetails();
    this.coordinatesData = JSON.parse(this.coordinatesData);
    this.searchRestaurants(this.searchData, this.coordinatesData).subscribe(
      res => {
        // console.log(res);
      }
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
