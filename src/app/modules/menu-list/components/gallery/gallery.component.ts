import { Component, OnInit } from '@angular/core';
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
  clickedImageName: any = null;
  clickedCount = 0;

  groupedMenuList: any = {
    key: 0
  };

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

  imageList: any = [];
  imageName: any = [];

  constructor(
    private menuListService: MenuListService,
  ) { }

  ngOnInit(): void {
    this.menuListService.currentMenuDataListSource.subscribe(
      (data: any) => {
        // this.menuList = data.resultList;
        this.createAnArray(data.resultList)
        this.itemName(data.resultList)
      }
    );
    $("#left").addClass('left');
    $("#left").removeClass('leftArrow');
    this.clickedImageName = this.imageName[this.clickedCount];
    console.log(this.clickedCount);
  }

  createAnArray(datalist) {
    datalist.forEach(
      (data: any) => {
        this.imageList.push(data.menu.item_image_path)
      }
    )
  }

  itemName(datalist) {
    datalist.forEach(
      (data: any) => {
        this.imageName.push(data.menu.item_name)
      }
    )
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
    if (this.clickedCount === 0) {
      $("#left").addClass('left');
      $("#left").removeClass('leftArrow');
    }
    else {
      this.clickedImage = this.imageList[--this.clickedCount];
      this.clickedImageName = this.imageName[this.clickedCount];
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      console.log(this.clickedCount);
      console.log(this.clickedImageName)
    }
  }

  rightArrow() {
    if (this.clickedCount === this.imageList.length - 1) {
      $("#right").addClass('right');
      $("#right").removeClass('rightArrow');
    }
    else {
      this.clickedImage = this.imageList[++this.clickedCount];
      this.clickedImageName = this.imageName[this.clickedCount];
      $("#right").removeClass('right');
      $("#right").addClass('rightArrow');
      $("#left").removeClass('left');
      $("#left").addClass('leftArrow');
      console.log(this.clickedCount);
      console.log(this.clickedImageName)
    }
  }
}