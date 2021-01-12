import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserGalleryService {

  // searchData: any;
  apiBaseUrl = environment.baseUrl;

  userGalleryDataListSource = new BehaviorSubject({});
  currentUserGalleryDataListSource = this.userGalleryDataListSource.asObservable();
  currentUserGalleryDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getRestaurantGalleryItems = (restaurantID): Observable<any> => {
    console.log(restaurantID);
    const url = `${this.apiBaseUrl}userDetails/getGalleryImages`;

    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          this.currentUserGalleryDataList = { ...data };
          // this.galleryDataListSource.next(this.currentGalleryDataList);
        }),
        retry(3)
      );
  }

}
