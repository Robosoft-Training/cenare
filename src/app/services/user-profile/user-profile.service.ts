import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { IAllUserReviews } from 'src/app/shared/interfaces/IAllUserReviews';
import { IUserOrders } from 'src/app/shared/interfaces/IUserOrders';
import { IUserProfileDetails } from 'src/app/shared/interfaces/IUserProfileDetails';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  apiBaseUrl = environment.baseUrl;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getUserDetails = (): Observable<IUserProfileDetails[]> => {
    const url = `${this.apiBaseUrl}userDetails/getUserDetails`;
    return this.httpClient.get<IUserProfileDetails[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }

  saveUserProfileData = (first_name: string, phone_number :any): Observable<IUserProfileDetails[]> => {
    const url = `${this.apiBaseUrl}userDetails/editUserDetails`;
    const nameArray = first_name.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray.slice(1,nameArray.length).join(" ");
    console.log(firstName, lastName, nameArray, first_name);
    const putBody = {
      "first_name" :firstName,
      "last_name" :lastName,
      "phone_number" :phone_number
    }    
    return this.httpClient.put<IUserProfileDetails[]>(url, putBody); 
  }
  saveUserProfilePic = (file: any): Observable<any[]> => {
    const url = `${this.apiBaseUrl}upload/uploadUserImage`;
    const formData: FormData = new FormData();
    formData.append('file', file[0]);
    return this.httpClient.post<any[]>(url, formData);
  }
  
  getUserOrders = (): Observable<IUserOrders[]> => {
    const url = `${this.apiBaseUrl}userDetails/getUserOrders?status=active`;
    return this.httpClient.get<IUserOrders[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }

  getAllUserReviews = (): Observable<IAllUserReviews[]> => {
    const url = `${this.apiBaseUrl}userDetails/getUserReviews`;
    return this.httpClient.get<IAllUserReviews[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }
}

