import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {}

  changeStarColor(clickID: number) {
    this.removeAllColor();
    if (clickID <= 2) {
      this.addColor(clickID, 'red-color');
    }else if (clickID <= 4){
      this.addColor(clickID, 'orange-color');
    }
    else {
      this.addColor(clickID, 'green-color');
    }
  }
  addColor(id: number, addClass: any){
    while (id !== 0) {
      $('#' + id).addClass(addClass);
      $('#' + id).removeClass('grey-color');
      id--;
    }
  }
  removeAllColor(){
    for (let i = 1; i < 6; i++) {
      $('#' + i).removeClass('green-color');
      $('#' + i).removeClass('orange-color');
      $('#' + i).removeClass('red-color');
      $('#' + i).addClass('grey-color');
    }
  }
}
