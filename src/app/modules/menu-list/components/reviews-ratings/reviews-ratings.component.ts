import { Component, OnInit } from '@angular/core';
import { ReviewsRatingsService } from 'src/app/services/resraurant-details/reviews-ratings/reviews-ratings.service';

@Component({
  selector: 'app-reviews-ratings',
  templateUrl: './reviews-ratings.component.html',
  styleUrls: ['./reviews-ratings.component.scss']
})
export class ReviewsRatingsComponent implements OnInit {

  count: any;
  datalist: any = [];
  // images: any = [];

  constructor(
    private reviewsRatingsService: ReviewsRatingsService
  ) { }

  ngOnInit(): void {
    this.reviewsRatingsService.currentReviewsDataListSource.subscribe(
      (data: any) => {
        // console.log(data)
        this.datalist = data.resultList;
        console.log(this.datalist)
      }
    )
  }

  addImage() {

  }

  submit() {

  }

  foodRatingOne() {
   // document.getElementById('foodRatingOne').style.border = "green";
  }

}
