import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { IMenuList } from 'src/app/shared/interfaces/IMenuList';

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

  menuList: IMenuList[] = [
    {
      menu: {
        menu_id: 0,
        item_name: '',
        cook_time: 0,
        category: '',
        course: '',
        desrcription: '',
        item_image_path: ''
      },
      price: 0
    }
  ];

  constructor(
    private menuListService: MenuListService,
  ) { }

  ngOnInit(): void {
    this.menuListService.currentMenuDataListSource.subscribe(
      (data: any) => {
        this.menuList = data.resultList;
      }
    );
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
    // console.log(this.clickedCount)
    if (this.clickedCount === 0) {
      $("#left").addClass('left');
      $("#left").removeClass('leftArrow');
    }
    else {
      this.clickedImage = this.imageList[--this.clickedCount];
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      console.log(this.clickedCount);
    }
  }

  rightArrow() {
    // console.log(this.clickedCount)
    if (this.clickedCount === this.imageList.length - 1) {
      $("#right").addClass('right');
      $("#right").removeClass('rightArrow');
    }
    else {
      this.clickedImage = this.imageList[++this.clickedCount];
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      console.log(this.clickedCount);
    }
  }
}