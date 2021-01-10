import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';
import { ConnectionComponent } from 'src/app/components/shared-components/empty-scenario/connection/connection.component';
import { NetworkStstusService } from 'src/app/services/network-service/network-ststus.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, AfterViewInit {

  constructor(
    private restaurantListService: RestaurantListService,
    private networkStstusService: NetworkStstusService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  ngOnInit(): void {
    let isOnlineOfline = this.networkStstusService.getNetworkStatus();
    if (!isOnlineOfline){
      const dialogRef = this.dialog.open(ConnectionComponent, { panelClass: 'connection' });
      dialogRef.afterClosed().subscribe(result => {});
    }
  }
}
