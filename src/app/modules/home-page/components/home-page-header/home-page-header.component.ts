import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationDataService } from 'src/app/services/location/location-data.service';
import { startWith, map, flatMap, mergeMap } from 'rxjs/operators';
import { ILocation } from 'src/app/shared/interfaces/Ilocation';
import { locationsList } from 'src/app/shared/locationsList';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationComponent } from 'src/app/components/shared-components/empty-scenario/location/location.component';
import { MatDialog } from '@angular/material/dialog';

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
  userSearchSelections = {
    locationName: '',
    searchName: '',
    dateTime: ''
  };
  timeOut: any;

  stateForm: FormGroup = this.formBuilder.group({
    stateGroup: '',
  });

  stateGroups: ILocation[] = locationsList;
  stateGroupOptions: any;

  constructor(
    private locationDetaService: LocationDataService,
    private formBuilder: FormBuilder,
    private restaurantLisService: RestaurantListService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    const element = document.querySelector('.mouse');
    if (window.pageYOffset > element!.clientHeight) {
      element!.classList.remove('d-block');
      element!.classList.add('d-none');
    }
  }

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
    if (!(this.userSearchSelections.searchName === '' || this.userSearchSelections.locationName === '')) {
      const dateTime: any = this.userSearchSelections.dateTime;
      if (!(dateTime)) {
        this.userSearchSelections.dateTime = new Date().toString();
      }

      this.userSearchSelections.searchName = value;
      this.locationDetaService.getLatitudeLongitude(this.userSearchSelections.locationName).pipe(
        mergeMap((coordinates) => this.restaurantLisService.searchRestaurants(this.userSearchSelections, coordinates))
      ).subscribe((result: any) => {
        if (result.resultList.length === 0) {
          const dialogRef = this.dialog.open(LocationComponent, { panelClass: 'dialog' });
          dialogRef.afterClosed().subscribe(result => {
          });
        }
        else {
          this.router.navigate(['/restaurant-list']);
        }
      },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  /*  = (event: any) => {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(
      () => {
        this.locationDetaService.getLatitudeLongitude(this.locationName).subscribe(
          (details) => {
            this.latitude = details.results[0].position.lat;
            this.longitude = details.results[0].position.lon;
          }
        );
      }
      , 1500);
  } */

  ngOnInit(): void {
    this.loadCurrentLocation();
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

}
