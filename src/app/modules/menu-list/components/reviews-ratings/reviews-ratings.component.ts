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
  sortType = 'date_high_low';
  isFoodRatingStored = false;
  isServiceRatingStored = false;
  foodRatings = 0;
  serviceRatings = 0;
  reviewText:any = null;
  imageUrls:any = [];
  files: any = null;

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
    this.sortType = this.sortType === 'date_high_low' ? 'date_low_high' : 'date_high_low';
    this.datalist = this.sortingService.sortingByDate(this.datalist, this.sortType);
  }

  detectFiles(event) {
    this.imageUrls = [];
    let files = event.target.files;
    this.files = files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  foodRating = (rating) => {
    this.changeStarColor(rating, 'food-');
    this.foodRatings = rating;
    this.isFoodRatingStored = false;
    this.localStorageService.setFoodRatings(rating);
    this.isFoodRatingStored = true;
  }

  serviceRating = (rating) => {
    this.changeStarColor(rating, 'service-');
    this.serviceRatings = rating;
    this.isServiceRatingStored = false;
    this.localStorageService.setServiceRatings(rating);
    this.isServiceRatingStored = true;
  }

  submitReview = () => {
    if(!(this.foodRatings===0 || this.serviceRatings===0)){
      this.reviewsRatingsService.addReviews(this.foodRatings, this.serviceRatings, this.reviewText, this.files).subscribe(
        msg => {
          console.log(msg);
          this.loadReviews();
        }
      );
    }
  }

  changeStarColor(clickID: number, commonId) {
    this.removeAllColor(commonId);
    if (clickID <= 2) {
      this.addColor(clickID,'starButton1-red', commonId); 
    }else if(clickID <= 4){
      this.addColor(clickID,'starButton1-orange', commonId); 
    }
    else{
      this.addColor(clickID,'starButton1-green', commonId); 
    }
  }
  addColor(id: number, addClass :any, commonId){
    while (id != 0) {
      $('#'+commonId + id).addClass(addClass);
      $('#'+commonId + id).removeClass('starButton1-gray');
      id--;
    }
  }
  removeAllColor(commonId){
    for (let i = 1; i < 6; i++) {
      $('#'+commonId + i).removeClass('starButton1-green');
      $('#'+commonId + i).removeClass('starButton1-orange');
      $('#'+commonId + i).removeClass('starButton1-red');
      $('#'+commonId + i).addClass('starButton1-gray');
    }
  }

  ngOnInit(): void {
    this.reviewsRatingsService.currentReviewsDataListSource.subscribe(
      (data: any) => {
        this.datalist = data.resultList;
      }
    )
  }
}
