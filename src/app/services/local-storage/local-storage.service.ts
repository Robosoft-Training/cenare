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
  setUserJWTtoken = (userJWTtokens) => {
    localStorage.setItem('crave-userJWTtokens', userJWTtokens);
  }

  getUserJWTtoken = () => {
    return localStorage.getItem('crave-userJWTtokens');
  }

  // User Name
  setUserName = (userName) => {
    localStorage.setItem('crave-userName', userName);
  }

  getUserName = () => {
    return localStorage.getItem('crave-userName');
  }

  setUserEmail = (userEmail) => {
    localStorage.setItem('crave-userEmail', userEmail);
  }

  getUserEmail = () => {
    return localStorage.getItem('crave-userEmail');
  }

  setUserId = (userId) => {
    localStorage.setItem('crave-userId', userId);
  }

  getUserId = () => {
    return localStorage.getItem('crave-userId');
  }

  setRestId = (restId) => {
    localStorage.setItem('crave-restId', restId);
  }

  getRestId = () => {
    return localStorage.getItem('crave-restId');
  }

  setFoodRatings = (ratings) => {
    localStorage.setItem('crave-foodRatings', ratings);
  }

  getFoodRatings = () => {
    return localStorage.getItem('crave-foodRatings');
  }

  setServiceRatings = (ratings) => {
    localStorage.setItem('crave-serviceRatings', ratings);
  }

  getServiceRatings = () => {
    return localStorage.getItem('crave-serviceRatings');
  }

}
