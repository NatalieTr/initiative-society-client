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
  walletSetCallback;

  constructor (private _initiativeService: InitiativesService) {
    this.wallet = _initiativeService.selectedWallet;
    this.wallets = _initiativeService.accounts;
  }

  ngOnInit () {
    this._initiativeService.onWalletSelect(this.walletSetCallback = (x) => this.onWalletChange(x));
  }

  ngOnDestroy () {
    this._initiativeService.releaseWalletSelect(this.walletSetCallback);
  }

  onWalletSet () {
    this._initiativeService.setSelectedWallet(this.wallet);
  }

  async onWalletChange (wallet: string) {
    if (wallet === this.wallet)
      return;
    this.wallets = await this._initiativeService.getAllAccounts();
    this.wallet = wallet;
  }

}
