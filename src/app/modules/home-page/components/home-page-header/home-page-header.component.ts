import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { LocationDataService } from 'src/app/services/location/location-data.service';
import { startWith, map } from 'rxjs/operators';
import { ILocation } from 'src/app/shared/interfaces/Ilocation';
import { locationsList } from 'src/app/shared/locationsList';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: any): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd  MMMM, yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

export const myFilter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class HomePageHeaderComponent implements OnInit {

  minDate = new Date();
  currentDate = 'Today, ' + new Date().toLocaleString('en-in', { month: 'long', day: 'numeric' }) + ', ' + new Date().getFullYear();
  date: any;
  locationName = 'Your Location';
  serachName = '';
  dateTime = '';
  timeOut: any;
  latitude = 0.0;
  longitude = 0.0;

  stateForm: FormGroup = this.formBuilder.group({
    stateGroup: '',
  });

  stateGroups: ILocation[] = locationsList;
  stateGroupOptions: any;

  constructor(
    private locationDetaService: LocationDataService,
    private formBuilder: FormBuilder
  ) { }

  loadCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.locationDetaService.getLocationDetails(this.latitude, this.longitude).subscribe(
        (details) => {
          this.locationName = details.addresses[0].address.municipality;
        }
      );
    });
  }

  private _filterGroup(value: string): ILocation[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: myFilter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
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
    if (!(this.serachName === '' || this.locationName === '')) {
      // Move to Restourent list page
      let dateTime: any = this.dateTime;
      if (!(dateTime)) {
        dateTime = new Date();
      }
      console.log(value, this.locationName, this.latitude, this.longitude, dateTime);
    }
  }

  getLocationData = (event: any) => {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(
      () => {
        console.log("Premnath");
      }
    , 1500);
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
