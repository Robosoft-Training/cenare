import { Component, OnInit } from '@angular/core';
import { MenuListService } from 'src/app/services/resraurant-details/menu-list/menu-list.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isHide = false;
  menuList: any[] = [];

  constructor(
    private menuListService: MenuListService
  ) { }

  ngOnInit(): void {
    this.menuListService.getRestaurantMenuItems(1).subscribe(
      msg => {
        console.log(msg);
        this.menuList = msg;
      }
    );
  }

  showPaymentDetails(){
    this.isHide = !this.isHide;
  }
  increaseQuantityOfDish()
  {
      console.log("INC","clicked");  
  }
}
