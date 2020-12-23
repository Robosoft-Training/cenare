import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor( private localStorageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('url :', req.url);

    let mapApiUrl = req.url.toString().substring(0, 22);
    let reqUrl;

    if (this.localStorageService.getUserJWTtoken() && !(mapApiUrl === 'https://api.tomtom.com')) {
      reqUrl = req.clone({
        setHeaders: { Authorization: `Bearer ${this.localStorageService.getUserJWTtoken()}`}
      });
    } else {
      reqUrl = req;
    }

    return next.handle(reqUrl).pipe(
      catchError(this.handleError)
    );
  }

  // tslint:disable-next-line: typedef
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
