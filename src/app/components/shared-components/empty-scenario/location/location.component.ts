import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  locationName = "";
  constructor(
    public dialogRef: MatDialogRef<any>,
    private localStorageService: LocalStorageService,
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
