import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import * as sha1 from 'sha1';
import {InitiativesService} from '../initiatives.service';
import { Toast } from "toaster-js";

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

  constructor(private _userData: DataService, private router: Router, private _initiativeService: InitiativesService) {
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
    console.log('Add initiative');
    if (this.title && this.description && this.locationData.lat && this.locationData.lng && this.acceptance) {
      this.titleHash = sha1(this.title);
      this.descriptionHash = sha1(this.description);
      this.latitudeHash = sha1(this.locationData.lat);
      this.longitudeHash = sha1(this.locationData.lng);
      console.log('this.titleHash', this.titleHash);
      console.log('this.descriptionHash', this.descriptionHash);
      console.log('this.latitudeHash', this.latitudeHash);
      console.log('this.longitudeHash', this.longitudeHash);
      this.contentHash = sha1(this.titleHash + this.descriptionHash + this.latitudeHash + this.longitudeHash);
      console.log(this.contentHash);
      // this.convertContentHash = this.hex2a(this.contentHash);
      // console.log('After hex2a', this.convertContentHash);
      const id = await this._initiativeService.createInitiative(this.contentHash, this.acceptance);
      new Toast(`TEST: Initiative created with ID=${ id }`, Toast.TYPE_DONE);
      localStorage.clear();
    }
  }

  // hex2a(hexx) {
  //   this.hex = hexx.toString();
  //   this.str = '';
  //   for (this.i = 0; this.i < this.hex.length; this.i += 2) {
  //     this.str += String.fromCharCode(parseInt(this.hex.substr(this.i, 2), 16));
  //   }
  //   return this.str;
  // }

}
