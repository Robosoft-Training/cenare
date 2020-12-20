import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IPopularBrands } from 'src/app/shared/interfaces/IPopularBrands';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PopularProductsService {

  coordinatesData: any;
  searchData: any;
  apiBaseUrl = 'http://192.168.225.87:3000/popularBrands';

  nearbyBrandsDataListSource = new BehaviorSubject({});
  currentnearbyBrandsDataListSource = this.nearbyBrandsDataListSource.asObservable();
  currentnearbyBrandsDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getPopularBrands = (): Observable<IPopularBrands[]> => {
    const url = `${this.apiBaseUrl}`;
    return this.httpClient.get<IPopularBrands[]>(url)
      .pipe(
        tap(data => {
          this.currentnearbyBrandsDataList = { ...data };
          this.nearbyBrandsDataListSource.next(this.currentnearbyBrandsDataList);
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  getNearbyBrands = (): Observable<any[]> => {

    this.searchData = this.localStorageService.getUserSearchDetails();
    this.searchData = JSON.parse(this.searchData);
    this.coordinatesData = this.localStorageService.getUserCoordinates();
    this.coordinatesData = JSON.parse(this.coordinatesData);

    let httpParams = new HttpParams();

    // Appending Loaction and Search by
    httpParams = httpParams.append('latitude', this.coordinatesData.results[0].position.lat);
    httpParams = httpParams.append('longitude', this.coordinatesData.results[0].position.lon);
    httpParams = httpParams.append('city', this.searchData.locationName);

    const url = `${this.apiBaseUrl}`;
    return this.httpClient.get<any[]>(url, {params: httpParams})
      .pipe(
        tap(data => {
          this.currentnearbyBrandsDataList = { ...data };
          this.nearbyBrandsDataListSource.next(this.currentnearbyBrandsDataList);
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  loadNearbyBrands = () => {
    this.getNearbyBrands().subscribe(
      res => {
        // console.log(res);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}

