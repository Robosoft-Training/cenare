import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { IUserProfileDetails } from 'src/app/shared/interfaces/IUserProfileDetails';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

  formType = 'orders';
  userDetails: IUserProfileDetails = {
    "first_name": "",
    "last_name": "",
    "country_code": "",
    "phone_number": 0,
    "email": "", 
    "image_path": "assets/images/avatar/icn_icecream.png"
  };
  constructor(private router: Router, private elementRef: ElementRef, private userProfileService: UserProfileService) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  ngOnInit(): void {
    this.userProfileService.getUserDetails().subscribe(
      (data :any) => {
        this.userDetails = data;
      }
    )
  }
  showFormType(formName): void {
    this.formType = formName;
    console.log(formName);
  }
}
