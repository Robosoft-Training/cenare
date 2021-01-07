import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorPageComponent } from '../../error-page/error-page.component';
import { ConnectionComponent } from './connection/connection.component';
import { LocationComponent } from './location/location.component';
import { OffersComponent } from './offers/offers.component';

@Component({
  selector: 'app-empty-scenario',
  templateUrl: './empty-scenario.component.html',
  styleUrls: ['./empty-scenario.component.scss']
})
export class EmptyScenarioComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  Location() {
    const dialogRef = this.dialog.open(LocationComponent,{panelClass:'dialog'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  Connection() {
    const dialogRef = this.dialog.open(ConnectionComponent,{panelClass:'connection'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  Offers() {
    const dialogRef = this.dialog.open(OffersComponent,{panelClass:'dialog'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
