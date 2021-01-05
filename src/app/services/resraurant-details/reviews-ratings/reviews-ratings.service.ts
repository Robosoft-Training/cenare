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
          this.reviewsDataListSource.next(data);
        }),
        retry(3)
      );
  }

  likeReviews = (reviewId): Observable<any> => {
    console.log(reviewId);
    const url = `${this.apiBaseUrl}review/likeReview?reviewId=${reviewId}`;
    const postBody = {};
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

  disLikeReviews = (reviewId): Observable<any> => {
    console.log(reviewId);
    const url = `${this.apiBaseUrl}review/unlikeReview?reviewId=${reviewId}`;
    return this.httpClient.delete<any[]>(url)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }

}
