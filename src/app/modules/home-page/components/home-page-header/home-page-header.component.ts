import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationDataService } from 'src/app/services/location/location-data.service';
import { startWith, map } from 'rxjs/operators';
import { ILocation } from 'src/app/shared/interfaces/Ilocation';
import { locationsList } from 'src/app/shared/locationsList';

export const myFilter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss'],
  
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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    const element = document.querySelector('.scroll-mouse');
    if (window.pageYOffset > element!.clientHeight) {
      element!.classList.remove('d-block');
      element!.classList.add('d-none');
    }
  }

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
      , 1500);
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
        this.locationDetaService.getLatitudeLongitude(event.target.value).subscribe(
          (details) => {
            this.latitude = details.results[0].position.lat;
            this.longitude = details.results[0].position.lon;
          }
        );
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
