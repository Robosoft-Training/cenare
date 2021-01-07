import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ConnectionComponent } from 'src/app/components/shared-components/empty-scenario/connection/connection.component';
import { NetworkStstusService } from 'src/app/services/network-service/network-ststus.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

  formType = 'orders';
  constructor(
    private elementRef: ElementRef,
    private networkStstusService: NetworkStstusService,
    public dialog: MatDialog
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
  
  showFormType(formName): void {
    this.formType = formName;
    console.log(formName);
  }
}
