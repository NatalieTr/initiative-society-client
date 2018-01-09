import { Component, OnInit } from '@angular/core';
import {InitiativesService} from '../initiatives.service';
import { Toast } from "toaster-js";


@Component({
  selector: 'app-initiatives',
  templateUrl: './initiatives.component.html',
  styleUrls: ['./initiatives.component.scss']
})
export class InitiativesComponent implements OnInit {
  allInitiatives: any;

  constructor(private _initiativeService: InitiativesService) { }

  ngOnInit() {
    this.getAllInitiatives();
  }

  async getAllInitiatives() {
    this.allInitiatives = await this._initiativeService.getAllInitiatives();
    console.log(this.allInitiatives);
  }

}
