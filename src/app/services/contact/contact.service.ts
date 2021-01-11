import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiBaseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  postFeedback = (details): Observable<any> => {
    console.log(details);
    const url = `${this.apiBaseUrl}feedback/addFeedback`;
    const postBody = details;
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }
}
