import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isHide = false;
  constructor() { }

  ngOnInit(): void {
  }
  showPaymentDetails(){
    this.isHide = !this.isHide;
  }
  increaseQuantityOfDish()
  {
      console.log("INC","clicked");
      
  }

}
