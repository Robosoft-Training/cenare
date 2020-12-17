import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationDataService {

  apiKey = 'AVVcB8jjfmf7eYftCZAdiyFzAyMnrVLO';
  getAdressBaseUrl = 'https://api.tomtom.com/search/2/reverseGeocode/';
  getLatitudeLongitudeBaseUrl = 'https://api.tomtom.com/search/2/structuredGeocode.json?countryCode=IN&limit=1&streetName=';

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
