import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() pageName;
  step1 = false;
  step2 = false;

  constructor() { }

  ngOnInit(): void {
    if(this.pageName === 'adress-page'){
      this.step1 = true;
    }
    else if(this.pageName === 'payment-method') {
      this.step1 = true;
      this.step2 = true;
    }
  }

}

// vD2#sD0%yR