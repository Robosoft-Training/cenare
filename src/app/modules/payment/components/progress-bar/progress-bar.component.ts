import { Component, Input, OnInit } from '@angular/core';
import { type } from 'jquery';
import { CartService } from 'src/app/services/order-details/cart.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() pageName;
  step1 = false;
  step2 = false;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.progressStageObserver.subscribe(
      msg => {
        console.log(msg, typeof msg);
        if(msg === '1') {
          this.step1 = false;
          this.step2 = false;
        }
        else if(msg === '2') {
          this.step1 = true;
          this.step2 = false;
        }
        else if(msg === '3'){
          this.step1 = true;
          this.step2 = true;
        }
      }
    );
  }

}
