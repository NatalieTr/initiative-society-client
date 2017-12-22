import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-my-initiatives',
  templateUrl: './my-initiatives.component.html',
  styleUrls: ['./my-initiatives.component.scss']
})
export class MyInitiativesComponent implements OnInit {
  mydata: any;
  constructor(private _userData: DataService) { }

  ngOnInit() {
   this.mydata = this._userData.getUserData();
    console.log(this.mydata);
  }

  createInitiative() {
    console.log('Add initiative');
  }

}
