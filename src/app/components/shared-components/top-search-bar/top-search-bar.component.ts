import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { myFilter } from 'src/app/modules/home-page/components/home-page-header/home-page-header.component';
import { LocationDataService } from 'src/app/services/location/location-data.service';
import { ILocation } from 'src/app/shared/interfaces/Ilocation';
import { locationsList } from 'src/app/shared/locationsList';

@Component({
  selector: 'app-top-search-bar',
  templateUrl: './top-search-bar.component.html',
  styleUrls: ['./top-search-bar.component.scss']
})
export class TopSearchBarComponent implements OnInit {

  minDate = new Date();
  date: any;
  locationName = 'Your Location';
  serachName = '';
  dateTime =  this.minDate;

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


  private _filterGroup(value: string): ILocation[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: myFilter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  ngOnInit(): void {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

}
