import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { startWith, map, flatMap, mergeMap } from 'rxjs/operators';
import { myFilter } from 'src/app/modules/home-page/components/home-page-header/home-page-header.component';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LocationDataService } from 'src/app/services/location/location-data.service';
import { RestaurantListService } from 'src/app/services/restaurant-list/restaurant-list.service';
import { ILocation } from 'src/app/shared/interfaces/Ilocation';
import { locationsList } from 'src/app/shared/locationsList';

@Component({
  selector: 'app-top-search-bar',
  templateUrl: './top-search-bar.component.html',
  styleUrls: ['./top-search-bar.component.scss']
})
export class TopSearchBarComponent implements OnInit {

  @Input() pageName: any;

  minDate = new Date();
  date: any;

  userSearchSelections = {
    locationName: 'Your Location',
    searchName: '',
    dateTime: ''
  };

  timeOut: any;
  latitude = 0.0;
  longitude = 0.0;
  navigateToReataurant = false;

  stateForm: FormGroup = this.formBuilder.group({
    stateGroup: '',
  });

  stateGroups: ILocation[] = locationsList;
  stateGroupOptions: any;

  constructor(
    private locationDetaService: LocationDataService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private restaurantLisService: RestaurantListService,
    private router: Router
  ) { }

  private _filterGroup(value: string): ILocation[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: myFilter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }
    return this.stateGroups;
  }

  setData = (userSearchSelections) => {
    // console.log(this.userSearchSelections);
    if (!userSearchSelections) {
      this.router.navigate(['/home-page']);
    }
    this.userSearchSelections = { ...JSON.parse(userSearchSelections) };
    if (this.navigateToReataurant) {
      this.router.navigate(['/restaurant-list']);
    }
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
    if (!(this.pageName === 'restaurant')) {
      this.navigateToReataurant = true;
    }
  }

  executeSearch = (value: any) => {
    if (!(this.userSearchSelections.searchName === '' || this.userSearchSelections.locationName === '')) {
      let dateTime: any = this.userSearchSelections.dateTime;
      if (!(dateTime)) {
        dateTime = new Date();
      }
      this.userSearchSelections.searchName = value;
      this.locationDetaService.getLatitudeLongitude(this.userSearchSelections.locationName).pipe(
        mergeMap((coordinates) => this.restaurantLisService.searchRestaurants(this.userSearchSelections, coordinates))
      ).subscribe((result) => {
        this.setData(this.localStorageService.getUserSearchDetails());
      },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  ngOnInit(): void {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    this.setData(this.localStorageService.getUserSearchDetails());
  }

}
