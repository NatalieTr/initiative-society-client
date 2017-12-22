import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  sharedData: any;
  getUserData() {
    return this.sharedData;
  }
  setUserData(data: any) {
    this.sharedData = data;
  }

}
