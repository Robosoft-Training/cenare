import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IDealsOffers } from 'src/app/shared/interfaces/IDealsOffers';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealsOffersService {

  apiBaseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getDealsOffers = (): Observable<IDealsOffers[]> => {
    const url = `${this.apiBaseUrl}dealsOffers`;
    return this.httpClient.get<IDealsOffers[]>(url)
      .pipe(
        tap(_ => console.log('Items Fetched')),
        retry(3)
      );
  }
}
