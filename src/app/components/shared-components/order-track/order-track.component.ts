import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.scss']
})
export class OrderTrackComponent implements OnInit {

  formType: any='card0';
  orderID: any;
  count = 0;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderID = this.activatedRoute.snapshot.paramMap.get('id');
    this.startTracking();
  }

  startTracking = () => {
    if(this.count <= 6){
      setTimeout(() => {
        this.count++;
        this.showFormType(`card${this.count}`);
      }, 2000);
    }
  }

  showFormType(formName): void {
    this.formType = formName;
    this.startTracking();
  }
}
