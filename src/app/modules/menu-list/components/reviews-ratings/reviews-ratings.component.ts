import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ReviewsRatingsService } from 'src/app/services/resraurant-details/reviews-ratings/reviews-ratings.service';
import { SortingService } from 'src/app/services/sorting/sorting.service';

@Component({
  selector: 'app-reviews-ratings',
  templateUrl: './reviews-ratings.component.html',
  styleUrls: ['./reviews-ratings.component.scss']
})
export class ReviewsRatingsComponent implements OnInit {

  count: any;
  datalist: any = [];
  likedReviewsId: any = [];
  sortType = 'date_high_low'

  constructor(
    private reviewsRatingsService: ReviewsRatingsService,
    private localStorageService: LocalStorageService,
    private sortingService: SortingService
  ) { }

  loadReviews = () => {
    const restId = this.localStorageService.getRestId()
    this.reviewsRatingsService.getRestaurantReviews(restId).subscribe(
      (data: any) => {
      }
    )
  }

  ngOnInit(): void {
    this.reviewsRatingsService.currentReviewsDataListSource.subscribe(
      (data: any) => {
        this.datalist = data.resultList;
      }
    )
  }

  likeReview = (reviewId) => {
    this.reviewsRatingsService.likeReviews(reviewId).subscribe(
      msg => {
        this.loadReviews();
        this.likedReviewsId.push(reviewId);
      }
    );
  }

  disLikeReview = (reviewId) => {
    this.reviewsRatingsService.disLikeReviews(reviewId).subscribe(
      msg => {
        this.loadReviews();
        this.likedReviewsId.splice(this.likedReviewsId.indexOf(reviewId));
      }
    );
  }

  sortByDate = () => {
    this.sortType = this.sortType==='date_high_low'?'date_low_high':'date_high_low';
    this.datalist = this.sortingService.sortingByDate(this.datalist, this.sortType);
  }

}
