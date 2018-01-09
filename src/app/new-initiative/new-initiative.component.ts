import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { InitiativesService } from '../initiatives.service';
import { Toast } from "toaster-js";
const { hashInitiativeContent } = require('../../../../global/utils.js');

@Component({
  selector: 'app-new-initiative',
  templateUrl: './new-initiative.component.html',
  styleUrls: ['./new-initiative.component.scss']
})
export class NewInitiativeComponent implements OnInit {
  title: string;
  description: string;
  coordinates: number [];
  acceptance: number; // 1..100% (as 0..100) % of votes for this initiative to be accepted
  titleHash: string;
  descriptionHash: string;
  latitudeHash: string;
  longitudeHash: string;
  contentHash: string;
  convertContentHash: string;

  locationData: any;
  hex: string;
  str: string;
  num = 0;
  i: number;

  constructor(
    private _userData: DataService,
    private router: Router,
    private _initiativeService: InitiativesService
  ) {
  }

  ngOnInit() {
    this._userData.setVisitMyInitiatives(true);
    this.getCoordinates();
  }

  getCoordinates() {
    if (this._userData.getInitiativeLocation() !== undefined) {
      this.locationData = this._userData.getInitiativeLocation();
      console.log('Initiative location', this.locationData);
      if (localStorage.getItem('initiativeTitle') !== null) {
        this.title = localStorage.getItem('initiativeTitle');
        this.description = localStorage.getItem('initiativeDesc');
      }
    }
  }

  chooseLocation() {
    console.log(this.title, this.description);
    if (this.title !== undefined && this.description !== undefined) {
      localStorage.setItem('initiativeTitle', this.title);
      localStorage.setItem('initiativeDesc', this.description);
    }
    this.router.navigate(['']);
  }

  async createInitiative() {
    if (this.title && this.description && this.locationData.lat && this.locationData.lng && this.acceptance) {
      const initiative = {
        title: this.title,
        description: this.description,
        latitude: this.locationData.lat,
        longitude: this.locationData.lng,
        acceptance: this.acceptance
      };
      const id = await this._initiativeService.createInitiative(
        hashInitiativeContent(initiative),
        this.acceptance,
        initiative
      );
      new Toast(`Initiative created with ID=${ id }`, Toast.TYPE_DONE);
      this.router.navigate([`initiative/${ id }`]);
      localStorage.clear();
    } else {
      new Toast(`Please, fill up all fields`, Toast.TYPE_ERROR);
    }
  }

}
