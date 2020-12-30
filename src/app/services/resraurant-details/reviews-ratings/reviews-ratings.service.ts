import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsRatingsService {

  apiBaseUrl = environment.baseUrl;
  reviewsDataListSource = new BehaviorSubject({});
  currentReviewsDataListSource = this.reviewsDataListSource.asObservable();
  currentReviewsDataList: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getRestaurantReviews = (restaurantID): Observable<any> => {
    console.log(restaurantID);
    const url = `${this.apiBaseUrl}review/getReviews`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('restaurantId', restaurantID);

    return this.httpClient.get<any[]>(url, { params: httpParams })
      .pipe(
        tap(data => {
          this.currentReviewsDataList = { ...data };
          this.reviewsDataListSource.next(data)
          // this.reviewsDataListSource.next(this.currentReviewsDataList);
        }),
        retry(3)
      );
  }
}
