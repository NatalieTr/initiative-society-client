import {HostListener, Injectable} from '@angular/core';
const InitiativesContract = require('../../../ethereum/build/contracts/Initiatives.json');
const Web3 = require('web3');
const contract = require('truffle-contract');
const serverUrl = 'http://127.0.0.1:9545';
const provider = new Web3.providers.HttpProvider(serverUrl);

declare var window: any;

@Injectable()
export class InitiativesService {

  InitiativesContractInstance = contract(InitiativesContract);

  account: any;
  accounts: any;
  web3: any;

  constructor() { }

  @HostListener('window:load')
  windowLoaded() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn('Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn('No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
  }

  onReady = () => {
    console.log("Duck 1");
    // Bootstrap the MetaCoin abstraction for Use.
    this.InitiativesContractInstance.setProvider(this.web3.currentProvider);
    this.testMethod();

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }
      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];
      console.log(this.account);
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this.testMethod();
    });
  }

  testMethod = () => {
    console.log("Duck 2");
    let initiativeInst;
    this.InitiativesContractInstance
      .deployed()
      .then(instance => {
        console.log(instance);
        initiativeInst = instance;
        return initiativeInst.getInitiativeById.call(0);
      }).then(value => {
      console.log(value);
    }).catch(e => {
      console.log(e);
    });

    // let initiativeInst;
    // this.InitiativesContractInstance
    //   .deployed()
    //   .then(instance => {
    //     initiativeInst = instance;
    //     return initiativeInst.lastInitiativeId.call({
    //       from: this.account
    //     });
    //   })
    //   .then(value => {
    //     console.log(value);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  }


}
