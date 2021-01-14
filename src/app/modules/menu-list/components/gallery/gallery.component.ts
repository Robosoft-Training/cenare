import { Component, OnInit } from '@angular/core';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { IMenuList } from 'src/app/shared/interfaces/IMenuList';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  status = 'All Photos';
  isOpen1 = false;
  clickedImage: any = null;
  clickedImageName: any = null;
  clickedCount = 0;
  isOpen = false;
  sliceCount = 10;

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
  increaseCount = () => { 
    this.sliceCount += (this.imageList.length - this.sliceCount);
  }

  close() {
    this.isOpen = !this.isOpen;
  }

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
  }

  loadImages = (status) => {
    this.status = status
    // this.userProfileService.getUserOrders(status).subscribe(
    //   (data: any) => {
    //     this.orders = data.resultList;
    //   }
    // )
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
  }
}