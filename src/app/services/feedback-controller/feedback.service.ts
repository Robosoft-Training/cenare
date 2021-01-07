import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  apiBaseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  addFeedback = (contact_number, email_id, entity_area, entity_city, entity_name, feedback_by, feedback_id, message, name, query_category): Observable<any> => {
    console.log(contact_number, email_id, entity_area, entity_city, entity_name, feedback_by, feedback_id, message, name, query_category);
    const url = `${this.apiBaseUrl}feedback/addFeedback`;
    const postBody = {
      contact_number,
      email_id,
      entity_area,
      entity_city,
      entity_name,
      feedback_by,
      feedback_id,
      message,
      name,
      query_category
    };
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }
}
