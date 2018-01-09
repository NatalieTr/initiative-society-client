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
  Math: any;
  myWallet: string; // my wallet
  walletCallback: any;

  constructor (private _initiativeService: InitiativesService, private route: ActivatedRoute) {
    this.Math = Math;
  }

  toEth (wei) {
    return Math.round((wei || 0) / Math.pow(10, 15)) / 1000;
  }

  countVotes (votes = [], positive = true) {
    if ((votes || []).length === 0)
      return 0;
    return (votes || []).filter(a => positive ? a : !a).length / (votes || []).length;
  }

  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadInitiative(this.id);
    });
    this._initiativeService.onWalletSelect(
      this.walletCallback = wallet => this.myWallet = wallet
    );
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
    this._initiativeService.releaseWalletSelect(this.walletCallback);
  }

  async loadInitiative (id = 1) {
    this.initiative = await this._initiativeService.getInitiativeById(id || 1);
    this.initiative.description = marked(this.initiative.description);
    this.initiative.voting = {};
    for (let i = 0; i < this.initiative.voters.length; ++i) {
      this.initiative.voting[this.initiative.voters[i]] = this.initiative.votes[i];
    }
  }

  async voteForInitiative (id = 1, positive = true) {

  }

  async fundInitiative (id = 1) {
    const value = (<HTMLInputElement>document.getElementById("fund-amount")).value;

  }

}
