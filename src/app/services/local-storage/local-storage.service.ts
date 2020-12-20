import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Reataurent list search details
  setUserSearchDetails = (userSearchDetails) => {
    localStorage.setItem('searchDetails', JSON.stringify(userSearchDetails));
  }

  getUserSearchDetails = () => {
    if (localStorage.getItem('searchDetails') === null) {
      return null;
    }
    return localStorage.getItem('searchDetails');
  }

  // User coordinates
  setUserCoordinates = (userSearchDetails) => {
    localStorage.setItem('userCoordinated', JSON.stringify(userSearchDetails));
  }

  getUserCoordinates = () => {
    if (localStorage.getItem('userCoordinated') === null) {
      return null;
    }
    return localStorage.getItem('userCoordinated');
  }

  // User JWT tokens
  setUserJWTtoken = (userSearchDetails) => {
    localStorage.setItem('userJWTtokens', JSON.stringify(userSearchDetails));
  }

  getUserJWTtoken = () => {
    if (localStorage.getItem('userJWTtokens') === null) {
      return null;
    }
    return localStorage.getItem('userJWTtokens');
  }

}
