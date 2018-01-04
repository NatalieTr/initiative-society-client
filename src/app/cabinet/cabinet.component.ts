import { Component, OnInit } from '@angular/core';
import {InitiativesService} from '../initiatives.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  wallets: string[];
  wallet: string;

  constructor(private _initiativeService: InitiativesService) {

  }

  ngOnInit() {
    this.getAllWallets();
  }

  async getAllWallets() {
    this.wallets = await this._initiativeService.getAllAccounts();
    this.wallet = this.wallets[0];
    this.onWalletSet();
  }

  onWalletSet () {
    this._initiativeService.setSelectedWallet(this.wallet);
  }

}
