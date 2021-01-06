import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  cards = {
    addressLabel: "",
    address: ""
  }

  cardlist: any = [
    {
      addresssLabel: "Home",
      address: "Downtown Burj Khalifa, Sheikh Mohammed bin Rashid Blvd - Dubai - United Arab EmiratesDubai, UAE"
    },
    {
      addresssLabel: "Home",
      address: "A-214, 4th Burj Khalifa, Dubai, UAE -Dubai - United Arab EmiratesDubai, UAE"
    }
  ];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(formType: any): void {
    this.dialog.open(AddAddressComponent, { panelClass: 'custom-dialog-container', data: { formType } });
  }

}
