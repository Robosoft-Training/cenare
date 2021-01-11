import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationDataService } from 'src/app/services/location/location-data.service';
import { ILocation } from 'src/app/shared/interfaces/Ilocation';
import { locationsList } from 'src/app/shared/locationsList';
import { mergeMap, startWith, map } from 'rxjs/operators';
import { myFilter } from 'src/app/modules/home-page/components/home-page-header/home-page-header.component';
import { Router } from '@angular/router';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  city = { value: '', error: '' };
  area = { value: '', error: '' };
  address = { value: '', error: '' };
  addressLabel = { value: '', error: '' };

  stateForm: FormGroup = this.formBuilder.group({
    stateGroup: '',
  });

  userSearchSelections = {
    locationName: '',
    searchName: '',
    dateTime: ''
  };

  timeOut: any;
  stateGroups: ILocation[] = locationsList;
  stateGroupOptions: any;

  constructor(
    public dialogRef: MatDialogRef<AddAddressComponent>,
    private locationDetaService: LocationDataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private restaurantLisService: RestaurantListService,
  ) { }

  loadCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.locationDetaService.getLocationDetails(position.coords.latitude, position.coords.longitude).subscribe(
          (details) => {
            this.userSearchSelections.locationName = details.addresses[0].address.municipality;
          }
        );
      },
      err => {
        this.userSearchSelections.locationName = 'Bengaluru';
      }
    );
  }

  searchAction = (event: any) => {
    clearTimeout(this.timeOut);
    // var $this = this;
    this.timeOut = setTimeout(
      () => {
        if (event.keyCode !== 13) {
          this.executeSearch(event.target.value);
        }
      }
      , 1000);
  }

  executeSearch = (value: any) => {
    if (!(this.userSearchSelections.searchName === '' || this.userSearchSelections.locationName === '')) {
      const dateTime: any = this.userSearchSelections.dateTime;
      if (!(dateTime)) {
        this.userSearchSelections.dateTime = new Date().toString();
      }

      this.userSearchSelections.searchName = value;
      this.locationDetaService.getLatitudeLongitude(this.userSearchSelections.locationName).pipe(
        mergeMap((coordinates) => this.restaurantLisService.searchRestaurants(this.userSearchSelections, coordinates))
      ).subscribe((result) => {
        this.router.navigate(['/restaurant-list']);
      },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveAddress(): void {
    if (!this.city.value) {
      this.city.error = 'City is required';
    }
    else if (!this.area.value) {
      this.area.error = 'Area is required';
    }
    else if (!this.address.value) {
      this.address.error = 'Address is required';
    }
    else if (!this.addressLabel.value) {
      this.addressLabel.error = 'Address label is required';
    }
    else {
      this.city.error = '';
      this.area.error = '';
      this.address.error = '';
      this.addressLabel.error = '';
    }
  }

  private _filterGroup(value: string): ILocation[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: myFilter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  ngOnInit(): void {
    this.loadCurrentLocation();
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }
}