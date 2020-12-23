import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationDataService {

  apiKey = environment.apiKey;
  getAdressBaseUrl = environment.getAdressBaseUrl;
  getLatitudeLongitudeBaseUrl = environment.getLatitudeLongitudeBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getLocationDetails(latitude: any, longitude: any): Observable<any> {
    const url = `${this.getAdressBaseUrl}${latitude}%2C${longitude}.json?key=${this.apiKey}`;
    return this.httpClient.get(url);
    // return this.httpClient.get(url);
  }

  getLatitudeLongitude(cityName: any): Observable<any> {
    const url = `${this.getLatitudeLongitudeBaseUrl}${cityName}&municipality=${cityName}&view=IN&key=${this.apiKey}`;
    // console.log(url);
    return this.httpClient.get(url);
    // return this.httpClient.get(url);
  }

}
