import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  initiativeLoc: any;
  flagVisit: boolean;

  getInitiativeLocation() {
    return this.initiativeLoc;
  }
  setInitiativeLocation(data: any) {
    this.initiativeLoc = data;
  }

  getVisitMyInitiatives() {
    return this.flagVisit;
  }
  setVisitMyInitiatives(data: boolean) {
    this.flagVisit = data;
  }

}
