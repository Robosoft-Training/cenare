import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  isOpen1 = false;
  clickedImage: any = null;
  clickedCount = 0;

  imageList = [
    "../../../../../assets/images/Vada.jpg",
    "../../../../../assets/images/TandooriChicken.jpg",
    "../../../../../assets/images/uttapam.jpg"
  ]

  constructor() { }

  ngOnInit(): void {
    $("#left").addClass('left');
    $("#left").removeClass('leftArrow');
    console.log(this.clickedCount);
  }

  displayImage(imageUrl, count) {
    this.clickedCount = count;
    this.clickedImage = imageUrl;
    this.isOpen1 = !this.isOpen1;
  }

  close1() {
    this.isOpen1 = !this.isOpen1;
  }

  leftArrow() {
    console.log(this.clickedCount)
    if (this.clickedCount === 0) {
      $("#left").addClass('left');
      $("#left").removeClass('leftArrow');
      console.log(this.clickedCount);
    }
    else {
      $("#left").removeClass('left');
      $("#right").addClass('right');
      $("#left").addClass('leftArrow');
      this.clickedImage = this.imageList[--this.clickedCount];
    }
  }

  rightArrow() {
    console.log(this.clickedCount)
    if (this.clickedCount === this.imageList.length-1) {
      $("#right").addClass('right');
      $("#right").removeClass('rightArrow');
      console.log(this.clickedCount);
    }
    else {
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      this.clickedImage = this.imageList[++this.clickedCount];
    }
  }

  // isOpen2 = false;
  // isOpen3 = false;
  // displayImage2() {
  //   this.isOpen2 = !this.isOpen2;
  // }

  // close2() {
  //   this.isOpen2 = !this.isOpen2;
  // }

  // displayImage3() {
  //   this.isOpen3 = !this.isOpen3;
  // }

  // close3() {
  //   this.isOpen3 = !this.isOpen3;
  // }

}