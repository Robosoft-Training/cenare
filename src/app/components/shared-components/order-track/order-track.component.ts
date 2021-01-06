import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.scss']
})
export class OrderTrackComponent implements OnInit {
  formType: any='card';
  constructor() { }

  ngOnInit(): void {
  }
  showFormType(formName): void {
    this.formType = formName;
  }
}
