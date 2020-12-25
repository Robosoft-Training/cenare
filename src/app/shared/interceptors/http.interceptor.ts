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

    const mapApiUrl = req.url.toString().substring(0, 22);
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(error.error);
    }
    return throwError(error);
  }
}
