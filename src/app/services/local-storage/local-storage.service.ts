import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setUserSearchDetails = (userSearchDetails) => {
    localStorage.setItem('searchDetails', JSON.stringify(userSearchDetails));
  }

  getUserSearchDetails = () => {
    if (localStorage.getItem('searchDetails') === null) {
      return null;
    }
    return localStorage.getItem('searchDetails');
  }

}
