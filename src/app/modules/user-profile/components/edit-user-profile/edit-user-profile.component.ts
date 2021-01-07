import { Component, ElementRef, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { IUserProfileDetails } from 'src/app/shared/interfaces/IUserProfileDetails';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

  avatarImageLinks = [
    "../../../../../assets/images/avatar/icn_icecream.png",
    "../../../../../assets/images/avatar/icn_cupcake.png",
    "../../../../../assets/images/avatar/icn_frenchfries.png",
    "../../../../../assets/images/avatar/icn_burger.png",
    "../../../../../assets/images/avatar/icn_chicken.png",
    "../../../../../assets/images/avatar/icn_bread.png",
    "../../../../../assets/images/avatar/icn_donut.png",
    "../../../../../assets/images/avatar/icn_beer.png",
    "../../../../../assets/images/avatar/icn_pizza.png"];

  userDetails: any = {
    "first_name": "",
    "last_name": "",
    "country_code": "",
    "phone_number": 0,
    "email": "",
    "image_path": "assets/images/avatar/icn_icecream.png"
  };
  fullName: string = "";
  phoneNumber: any = "";
  file: any = null;
  fullNameError = false;
  phoneNumberError = false;
  isLoading = false;

  constructor(private elementRef: ElementRef, private userProfileService: UserProfileService) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  ngOnInit(): void {
    this.loadData();
  }
  saveUserData() {
    if (this.fullName.length === 0) {
      this.fullNameError = true;
    }
    else if (this.phoneNumber.toString().length !== 10) {
      this.fullNameError = false;
      this.phoneNumberError = true;
    }
    else {
      this.phoneNumberError = false;
      this.userProfileService.saveUserProfileData(this.fullName, this.phoneNumber).subscribe(
        (data: any) => {}
      )
    }
  }
  detectFiles(event) {
    let file = event.target.files;
    this.file = file;
    this.isLoading = true;
    this.userProfileService.saveUserProfilePic(this.file).subscribe(
      (msg: any) => {
        this.loadData();
      }
    )
  }
  setAvatar(img){
    this.userDetails.image_path = img;
  }
  loadData(){
    this.isLoading = true;
    this.userProfileService.getUserDetails().subscribe(
      (data: any) => {
        this.fullName = data.first_name + " " + data.last_name;
        this.phoneNumber = data.phone_number;
        this.userDetails = data;
        this.isLoading = false;
      }
    )
  }

}
