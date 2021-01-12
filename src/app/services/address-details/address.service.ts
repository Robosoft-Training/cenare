import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiBaseUrl = environment.baseUrl;
  adressDataListSource = new BehaviorSubject({});
  currentAdressDataListSource = this.adressDataListSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getPrimaryAddress = (): Observable<any> => {
    const url = `${this.apiBaseUrl}userAddress/getPrimaryAddress`;
    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {}),
        retry(3)
      );
  }

  getAllAddress = (): Observable<any> => {
    const url = `${this.apiBaseUrl}userAddress/getAllAddress`;
    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(data => {
          this.adressDataListSource.next(data);

        }),
        retry(3)
      );
  }
  
  addAddress = (address,address_label,area,city,landmark): Observable<any> => {
    console.log(address,address_label,area,city,landmark);
    const url = `${this.apiBaseUrl}userAddress/addAddress`;
    const postBody = {
      address,
      address_label,
      area,
      city,
      landmark
    };
    return this.httpClient.post<any[]>(url, postBody)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }
  
  deleteAddress = (addressId): Observable<any> => {
    console.log(addressId);
    const url = `${this.apiBaseUrl}userAddress/deleteAddress`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('addressId', addressId);
    return this.httpClient.delete<any[]>(url, {params: httpParams})
      .pipe(
        tap(data => {
          console.log(data);
        }),
        retry(3)
      );
  }
 editAddress = (address,address_label,area,city,landmark): Observable<any> => {
    console.log(address,address_label,area,city,landmark);
    const url = `${this.apiBaseUrl}userAddress/editAddress`;
    const putBody = {
      address,
      address_label,
      area,
      city,
      landmark
    };
    return this.httpClient.put<any[]>(url,putBody)
      .pipe(
        tap(data => {
          // console.log(data);
        }),
        retry(3)
      );
  }

  updateAddress = (addressId): Observable<any> => {
    console.log(addressId);
    const url = `${this.apiBaseUrl}userAddress/editAddress`;
    const putBody = {
    };
    return this.httpClient.put<any[]>(url,putBody)
      .pipe(
        tap(data => {
          // console.log(data);
        }),
        retry(3)
      );
  }

  updatePrimaryAdress = (addressId): Observable<any> => {
    const url = `${this.apiBaseUrl}userAddress/updatePrimaryAddress?addressId=${addressId}`;
    const putBody = {
    };
    return this.httpClient.put<any[]>(url,putBody)
      .pipe(
        tap(data => {
        }),
        retry(3)
      );
  }


}
