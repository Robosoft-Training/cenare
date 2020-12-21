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
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
