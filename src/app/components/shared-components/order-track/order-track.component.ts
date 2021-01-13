import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.scss']
})
export class OrderTrackComponent implements OnInit {
  formType: any='card';
  orderID: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderID = this.activatedRoute.snapshot.paramMap.get('id');
  }
  showFormType(formName): void {
    this.formType = formName;
  }
}
