import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkStstusService {

  constructor() { }

  getNetworkStatus = () => {
    let isOnlineOfline = navigator.onLine;
    return isOnlineOfline;
  }
}
