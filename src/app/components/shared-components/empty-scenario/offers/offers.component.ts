import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  locationName = "";
  constructor(
    public dialogRef: MatDialogRef<any>,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const userSearchSelections: any = this.localStorageService.getUserSearchDetails();
    const userData = { ...JSON.parse(userSearchSelections) };
    this.locationName = userData.locationName;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
