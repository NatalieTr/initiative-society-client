import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import * as sha1 from 'sha1';

@Component({
  selector: 'app-my-initiatives',
  templateUrl: './my-initiatives.component.html',
  styleUrls: ['./my-initiatives.component.scss']
})
export class MyInitiativesComponent implements OnInit {
  title: string;
  description: string;
  coordinates: number [];
  acceptance: number; // 1..100% (as 0..100) % of votes for this initiative to be accepted
  a: string;

  locationData: any;

  constructor(private _userData: DataService, private router: Router) { }

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
    if ( this.title !== undefined && this.description !== undefined) {
      localStorage.setItem('initiativeTitle', this.title);
      localStorage.setItem('initiativeDesc', this.description);
    }
    this.router.navigate(['']);
  }

  createInitiative() {
    console.log('Add initiative');
    console.log(this.acceptance);
    // this.a = sha1('message');
    // console.log(this.a);
    // delete local storage here
  }

}
