import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserGalleryService } from 'src/app/services/user-profile/user-gallery.service'; 

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  isOpen1 = false;
  clickedImage: any = null;
  clickedImageName: any = null;
  clickedCount = 0;

  imageList: any = [];
  imageName: any = [];
 
  groupedMenuList: any = {
    key: 0
  };

  constructor(
    private userGalleryService: UserGalleryService, 
  ) { }

  ngOnInit(): void {
    this.userGalleryService.getRestaurantGalleryItems().subscribe( 
      (data: any) => {
        this.imageList = data.resultList; 
        console.log(this.imageList)
      }
    );
    $("#left").addClass('left');
    $("#left").removeClass('leftArrow');
    
  }

  displayImage(imageUrl, count) {
    if (count<=0) {
      console.log(count)
      $('#left').addClass('left'); 
      $('#left').removeClass('leftArrow');
    }
    this.clickedCount = count;
    this.clickedImage = imageUrl;
    this.isOpen1 = !this.isOpen1;
    this.leftArrow(this.clickedCount)
  }

  close1() {
    this.isOpen1 = !this.isOpen1;
  }

  leftArrow(co=0) {
    this.clickedCount+=co
    if (this.clickedCount <=0) {
      $('#left').addClass('left'); 
      $('#left').removeClass('leftArrow'); 
      this.clickedImage = this.imageList[this.clickedCount];
    }
    else if
      (this.clickedCount === this.imageList.length - 1) {
        $('#right').addClass('right'); 
        $('#right').removeClass('rightArrow'); 
        this.clickedImage = this.imageList[this.clickedCount];
      }
    
    else {
      this.clickedImage = this.imageList[this.clickedCount];
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
     
    }
    console.log(this.clickedCount);
    console.log(co);
  }

  rightArrow() {
    if (this.clickedCount === this.imageList.length - 1) {
      $('#right').addClass('right'); 
      $('#right').removeClass('rightArrow'); 
    }
    else {
      this.clickedImage = this.imageList[++this.clickedCount];
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      console.log(this.clickedCount);
      console.log(this.clickedImageName)
    }
  }
} 