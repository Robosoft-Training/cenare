import { Component, OnInit } from '@angular/core';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';
import { IMenuList } from 'src/app/shared/interfaces/IMenuList';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  isOpen = false;

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


  displayImage() {
    this.isOpen = !this.isOpen;
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
        this.menuList = data.resultList;
      }
    );
  }
}
