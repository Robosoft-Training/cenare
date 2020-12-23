import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  // searchData: any;
  apiBaseUrl = environment.baseUrl;

  galleryDataListSource = new BehaviorSubject({});
  currentGalleryDataListSource = this.galleryDataListSource.asObservable();
  currentGalleryDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getRestaurantGalleryItems = (restaurantID): Observable<any> => {
    console.log(restaurantID);
    const url = `${this.apiBaseUrl}getGalleryImages`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurant_id', restaurantID);

    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          this.currentGalleryDataList = { ...data };
          // this.galleryDataListSource.next(this.currentGalleryDataList);
        }),
        retry(3)
      );
  }
}
