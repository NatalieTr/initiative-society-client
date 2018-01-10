import { Component, OnInit } from '@angular/core';
const { web3ProviderHost, web3ProviderPort } = require("../../../../global/const.js");

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  rpcLocation: string = "";

  constructor() {

  }

  ngOnInit() {
    this.rpcLocation = `${ location.protocol }//${ web3ProviderHost }:${ web3ProviderPort }`;
  }

}
