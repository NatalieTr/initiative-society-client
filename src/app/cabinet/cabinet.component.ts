import { Component, OnInit } from '@angular/core';
import {InitiativesService} from '../initiatives.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  wallets: string[] = [];
  wallet: string;
  balances: number[] = [];
  walletSetCallback;
  Math: any;

  constructor (private _initiativeService: InitiativesService) {
    this.Math = Math;
    this.wallet = _initiativeService.selectedWallet;
    this.wallets = _initiativeService.accounts || [];
    this.refreshBalances();
  }

  ngOnInit () {
    this._initiativeService.onWalletSelect(this.walletSetCallback = (x) => this.onWalletChange(x));
  }

  ngOnDestroy () {
    this._initiativeService.releaseWalletSelect(this.walletSetCallback);
  }

  async refreshBalances () {
    this.balances = await Promise.all(
      this.wallets.map(address => this._initiativeService.web3.eth.getBalance(address))
    );
  }

  onWalletSet () {
    this._initiativeService.setSelectedWallet(this.wallet);
  }

  async onWalletChange (wallet: string) {
    if (wallet === this.wallet)
      return;
    this.wallets = await this._initiativeService.getAllAccounts();
    await this.refreshBalances();
    this.wallet = wallet;
  }

}
