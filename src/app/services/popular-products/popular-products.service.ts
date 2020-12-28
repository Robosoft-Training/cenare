import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IPopularBrands } from 'src/app/shared/interfaces/IPopularBrands';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopularProductsService {

  coordinatesData: any;
  searchData: any;
  apiBaseUrl = environment.baseUrl;
  // apiBaseUrl = environment.baseUrl;

  nearbyBrandsDataListSource = new BehaviorSubject({});
  currentnearbyBrandsDataListSource = this.nearbyBrandsDataListSource.asObservable();
  currentnearbyBrandsDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getPopularBrands = (): Observable<IPopularBrands[]> => {
    const url = `${this.apiBaseUrl}brands/getAllBrands`;
    return this.httpClient.get<IPopularBrands[]>(url)
      .pipe(
        tap(data => {
          // console.log(data);
          this.currentnearbyBrandsDataList = { ...data };
          this.nearbyBrandsDataListSource.next(this.currentnearbyBrandsDataList);
        }),
        retry(3)
      );
  }

  getNearbyBrands = (): Observable<any[]> => {

    this.searchData = this.localStorageService.getUserSearchDetails();
    this.searchData = JSON.parse(this.searchData);
    this.coordinatesData = this.localStorageService.getUserCoordinates();
    this.coordinatesData = JSON.parse(this.coordinatesData);
    const adress = this.searchData.locationName;
    const cityName = adress.replace(/ .*/, '');


    let httpParams = new HttpParams();

    // Appending Loaction and Search by
    httpParams = httpParams.append('latitude', this.coordinatesData.results[0].position.lat);
    httpParams = httpParams.append('longitude', this.coordinatesData.results[0].position.lon);
    httpParams = httpParams.append('city', cityName);

    const url = `${this.apiBaseUrl}brands/getNearbyBrands`;
    return this.httpClient.get<any[]>(url, {params: httpParams})
      .pipe(
        tap(data => {
          this.currentnearbyBrandsDataList = { ...data };
          // console.log(data);
          this.nearbyBrandsDataListSource.next(this.currentnearbyBrandsDataList);
        }),
        retry(3)
      );
  }

  loadNearbyBrands = () => {
    this.getNearbyBrands().subscribe(
      res => {
        // console.log(res);
      }
    );
  }
}

