import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
