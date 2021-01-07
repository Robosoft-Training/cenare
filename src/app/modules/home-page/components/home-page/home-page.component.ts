import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionComponent } from 'src/app/components/shared-components/empty-scenario/connection/connection.component';
import { NetworkStstusService } from 'src/app/services/network-service/network-ststus.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private networkStstusService: NetworkStstusService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let isOnlineOfline = this.networkStstusService.getNetworkStatus();
    if (!isOnlineOfline){
      const dialogRef = this.dialog.open(ConnectionComponent, { panelClass: 'connection' });
      dialogRef.afterClosed().subscribe(result => {});
    }
  }
}
