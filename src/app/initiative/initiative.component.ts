import { Component, OnInit } from '@angular/core';
import {InitiativesService} from "../initiatives.service";
import { ActivatedRoute } from '@angular/router';
import marked from "marked";

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.scss']
})
export class InitiativeComponent implements OnInit {

  id: number;
  initiative: any = {};
  private sub: any;

  constructor (private _initiativeService: InitiativesService, private route: ActivatedRoute) {

  }

  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadInitiative(this.id);
    });
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

  async loadInitiative (id = 1) {
    this.initiative = await this._initiativeService.getInitiativeById(id || 1);
    this.initiative.description = marked(this.initiative.description);
  }

}
