import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

   // Reataurent list search details
   setUserSearchDetails = (userSearchDetails) => {
    localStorage.setItem('crave-searchDetails', JSON.stringify(userSearchDetails));
  }

  getUserSearchDetails = () => {
    return localStorage.getItem('crave-searchDetails');
  }

  // User coordinates
  setUserCoordinates = (userSearchDetails) => {
    localStorage.setItem('crave-userCoordinates', JSON.stringify(userSearchDetails));
  }

  getUserCoordinates = () => {
    return localStorage.getItem('crave-userCoordinates');
  }

  // User JWT tokens
  setUserJWTtoken = (userSearchDetails) => {
    localStorage.setItem('crave-userJWTtokens', JSON.stringify(userSearchDetails));
  }

  getUserJWTtoken = () => {
    return localStorage.getItem('crave-userJWTtokens');
  }

  // User Name
  setUserName = (userSearchDetails) => {
    localStorage.setItem('crave-userName', JSON.stringify(userSearchDetails));
  }

  getUserName = () => {
    return localStorage.getItem('crave-userName');
  }

  setUserEmail = (userSearchDetails) => {
    localStorage.setItem('crave-userEmail', JSON.stringify(userSearchDetails));
  }

  getUserEmail = () => {
    return localStorage.getItem('crave-userEmail');
  }

}
