import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IPopularBrands } from 'src/app/shared/interfaces/IPopularBrands';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopularProductsService {

  apiBaseUrl = 'http://192.168.225.87:3001/popularBrands';

  constructor(private httpClient: HttpClient) { }

  getPopularBrands = (): Observable<IPopularBrands[]> => {
    const url = `${this.apiBaseUrl}`;
    return this.httpClient.get<IPopularBrands[]>(url)
    .pipe(
        tap(_ => console.log("Items Fetched")),
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

