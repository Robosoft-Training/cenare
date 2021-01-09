import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ConnectionComponent } from 'src/app/components/shared-components/empty-scenario/connection/connection.component';
import { NetworkStstusService } from 'src/app/services/network-service/network-ststus.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';
import { IUserProfileDetails } from 'src/app/shared/interfaces/IUserProfileDetails';

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
    public dialog: MatDialog,
    private router: Router,
    private userProfileService: UserProfileService
  ) { }
  imagePlaceholder = "assets/images/avatar/icn_icecream.png";
  userDetails: IUserProfileDetails = {
    "first_name": "",
    "last_name": "",
    "country_code": "",
    "phone_number": 0,
    "email": "", 
    "image_path": ";"
  };

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f1f3fb';
  }

  ngOnInit(): void {
    let isOnlineOfline = this.networkStstusService.getNetworkStatus();
    if (!isOnlineOfline){
      const dialogRef = this.dialog.open(ConnectionComponent, { panelClass: 'connection' });
      dialogRef.afterClosed().subscribe(result => {});
    }
    this.userProfileService.getUserDetails().subscribe(
      (data :any) => {
        this.userDetails = data;
      }
    )
  }
  
  showFormType(formName): void {
    this.formType = formName;
    console.log(formName);
  }
}
