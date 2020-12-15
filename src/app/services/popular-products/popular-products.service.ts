import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPopularBrands } from 'src/app/shared/interfaces/IPopularBrands';

@Injectable({
  providedIn: 'root'
})
export class PopularProductsService {

  apiBaseUrl = 'http://192.168.225.87:3001/popularBrands';

  constructor(private httpClient: HttpClient) { }

  getPopularBrands = (): Observable<any[]> => {
    const url = `${this.apiBaseUrl}`;
    return this.httpClient.get<any[]>(url);
  }

}

