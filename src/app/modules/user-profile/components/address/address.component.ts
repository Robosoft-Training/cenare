import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressService } from 'src/app/services/address-details/address.service';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  adresslist: any = [
    {
      "address_id": 0,
      "user_id": 0,
      "city": "",
      "area": "",
      "address": "",
      "address_label": "",
      "landmark": "",
      "primary_address": false
    }
  ];

  constructor(
    public dialog: MatDialog,
    public adressService: AddressService
  ) { }

  updatePrimaryAdress = (adressId) => {
    this.adressService.updatePrimaryAdress(adressId).subscribe(
      msg => {
        this.adressService.getAllAddress().subscribe();
      }
    );
  }

  deleteAdress = (adressId) => {
    this.adressService.deleteAddress(adressId).subscribe(
      msg => {
        this.adressService.getAllAddress().subscribe();
      }
    );
  }

  ngOnInit(): void {
    this.adressService.currentAdressDataListSource.subscribe(
      (data: any) => {
        this.adresslist = data.resultList;
      }
    );
    this.adressService.getAllAddress().subscribe();
  }

  openDialog(formType: any): void {
    this.dialog.open(AddAddressComponent, { panelClass: 'custom-dialog-container', data: { formType } });
  }
}
