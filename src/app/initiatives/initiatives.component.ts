import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../initiatives.service';
import { Toast } from "toaster-js";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-initiatives',
  templateUrl: './initiatives.component.html',
  styleUrls: ['./initiatives.component.scss']
})
export class InitiativesComponent implements OnInit {
  allInitiatives: any;

  constructor(private _initiativeService: InitiativesService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAllInitiatives();
  }

  async getAllInitiatives() {
    this.allInitiatives = await this._initiativeService.getAllInitiatives();
    console.log(this.allInitiatives);
  }

  showInitiative(id) {
    this.router.navigate([`initiative/${id}`]);
  }

  createInitiative() {
    this.router.navigate([`new-initiative`]);
  }

}
