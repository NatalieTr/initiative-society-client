import { Component, OnInit } from '@angular/core';
import { InitiativesService } from "../initiatives.service";
import { ActivatedRoute } from '@angular/router';
import { shortenAddress } from "../utils";
import marked from "marked";
const { hashInitiativeContent } = require("../../../../global/utils.js");

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

  shortenAddress (a) {
    return shortenAddress(a);
  }

  countVotes ({ voters, votes, funds, totalFunds }, positive = true) {
    if ((votes || []).length === 0)
      return 0;
    let p = 0;
    for (let i = 0; i < votes.length; ++i) {
      if (votes[i] === positive) {
        p += funds[voters[i]];
      }
    }
    return Math.round(p / totalFunds * 10000) / 100;
  }

  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadInitiative(this.id);
    });
    this._initiativeService.onWalletSelect(
      this.walletCallback = wallet => {
        this.myWallet = wallet;
      }
    );
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
    this._initiativeService.releaseWalletSelect(this.walletCallback);
  }

  async loadInitiative (id = 1) {
    this.initiative = await this._initiativeService.getInitiativeById(id || 1);
    const hash = hashInitiativeContent(this.initiative);
    this.initiative.description = marked(this.initiative.description || "");
    this.initiative.voting = {};
    for (let i = 0; i < this.initiative.voters.length; ++i) {
      this.initiative.voting[this.initiative.voters[i]] = this.initiative.votes[i];
    }
    console.log(hash, this.initiative.contentHash);
    this.initiative.verified = hash === this.initiative.contentHash;
  }

  async completeInitiative (id = 1) {
    await this._initiativeService.completeInitiative(id);
    await this.loadInitiative(this.id);
  }

  async voteForInitiative (id = 1, positive = true) {
    await this._initiativeService.voteForInitiative(id, positive);
    await this.loadInitiative(this.id);
  }

  async fundInitiative (id = 1) {
    const value = +(<HTMLInputElement>document.getElementById("fund-amount")).value
      * Math.pow(10, 18);
    await this._initiativeService.fundInitiative(id, value);
    await this.loadInitiative(this.id);
    (<HTMLInputElement>document.getElementById("fund-amount")).value = "0";
  }

}
