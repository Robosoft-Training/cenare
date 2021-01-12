import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { IAllUserReviews } from 'src/app/shared/interfaces/IAllUserReviews';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor(private userProfileService: UserProfileService) { }

  reviewsList: IAllUserReviews[] = [{
    restaurant_name: "",
    date: "",
    food_rating: 0,
    service_rating: 0,
    description: "",
    food_images: []
  }];
  
  ngOnInit(): void {
    this.userProfileService.getAllUserReviews().subscribe(
      (data: any) => {
        console.log(data);
        this.reviewsList = data.resultList;
      })
  }
}
