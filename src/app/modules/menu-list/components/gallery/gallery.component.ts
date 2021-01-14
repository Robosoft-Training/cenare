import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { ReviewsRatingsService } from 'src/app/services/resraurant-details/reviews-ratings/reviews-ratings.service';
import { IMenuList } from 'src/app/shared/interfaces/IMenuList';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  status = 'All Images';
  isOpen1 = false;
  clickedImage: any = null;
  clickedImageName: any = null;
  clickedCount = 0;
  isOpen = false;
  sliceCount = 10;
  startCount = 0;
  endCount = 0;

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
  userImageListCount = 0;
  menuImageListCount;
  imageName: any = [];

  close() {
    this.isOpen = !this.isOpen;
  }

  constructor(
    private menuListService: MenuListService,
    private reviewsRatingsService: ReviewsRatingsService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const restId = this.localStorageService.getRestId();
    this.menuListService.currentMenuDataListSource.subscribe(
      (data: any) => {
        this.createAnArray(data.resultList);
        this.itemName(data.resultList);
        this.menuImageListCount = data.resultList.length;
      }
    );

    this.reviewsRatingsService.getRestaurantReviews(restId).subscribe(
      (data: any) => {
        this.customerImages(data.resultList);
        this.loadImages('All Images');
      }
    );

    $("#left").addClass('left');
    $("#left").removeClass('leftArrow');
  }

  customerImages = (data) => {
    data.forEach(element => {
      element.foodImages.forEach(element => {
        this.imageList.push(element);
        this.userImageListCount += 1;
      });
    });
  }

  createAnArray(datalist) {
    datalist.forEach(
      (data: any) => {
        this.imageList.push(data.menu.item_image_path)
      }
    )
  }

  increaseCount = () => {
    if (this.status === 'All Images') {
      this.sliceCount += 10;
    }
    else if (this.status === 'Added by Restaurant') {
      this.sliceCount += (this.menuImageListCount - this.sliceCount);
    }
    else if (this.status === 'Added by Customers') {
      this.sliceCount += 10;
    }
  }

  loadImages = (status) => {
    this.status = status;
    if (status === 'All Images') {
      this.startCount = 0;
      this.sliceCount = 10;
      this.endCount = this.menuImageListCount + this.userImageListCount;
    }
    else if (status === 'Added by Restaurant') {
      this.startCount = 0;
      this.sliceCount = 10;
      this.endCount = this.menuImageListCount;
    }
    else if (status === 'Added by Customers') {
      this.startCount = this.menuImageListCount + 1;
      this.sliceCount = this.menuImageListCount + 10;
      this.endCount = this.userImageListCount;
    }
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
    this.leftArrow(this.clickedCount)
  }

  close1() {
    this.isOpen1 = !this.isOpen1;
  }

  leftArrow(co = 0) {
    this.clickedCount += co
    if (this.clickedCount <= 0) {
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
  }
}