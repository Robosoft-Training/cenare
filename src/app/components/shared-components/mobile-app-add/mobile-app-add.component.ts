import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-app-add',
  templateUrl: './mobile-app-add.component.html',
  styleUrls: ['./mobile-app-add.component.scss']
})
export class MobileAppAddComponent implements OnInit {

  constructor() { }

  goToPlayStore = () => { };
  goToAppStore = () => { };

  ngOnInit(): void {
  }

}
