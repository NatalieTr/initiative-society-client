import { Injectable } from '@angular/core';
import { Toast } from "toaster-js";
import { graphQlGet } from "./utils";
const { hex2a, decodeGetInitiativeById } = require("../../../global/utils.js");
const { web3ProviderHost, web3ProviderPort } = require("../../../global/const.js");
const InitiativesContract = require('../../../ethereum/build/contracts/Initiatives.json');
const Web3 = require('web3');
const truffleContract = require('truffle-contract');
const serverUrl = `http://${ web3ProviderHost }:${ web3ProviderPort }`;

declare var window: any;

const POLLING_INTERVAL = 500;
async function pollWeb3ForAccounts (initiativesService: InitiativesService) {
  const accs = (await initiativesService.web3.eth.getAccounts()) || [];
  if (accs.indexOf(initiativesService.selectedWallet) === -1 && accs.length > 0) {
    console.log("CHANGE", accs.slice(), initiativesService.selectedWallet);
    initiativesService.setSelectedWallet(accs[0], true);
  }
}

@Injectable()
export class InitiativesService {

  contractDefinition = truffleContract(InitiativesContract);
  initiatives = null;
  initialized = false;
  walletSelectCallbacks = [];

  accounts: any;
  selectedWallet: string;
  web3: any;
  hex: string;
  str: string;
  num = 0;
  i: number;

  async setSelectedWallet (wallet: string, resetAccounts: boolean = false) {
    if (wallet === this.selectedWallet)
      return;
    this.selectedWallet = wallet;
    if (resetAccounts)
      this.accounts = await this.web3.eth.getAccounts();
    this.walletSelectCallbacks.forEach(cb => cb(this.selectedWallet));
  }

  async onWalletSelect (cb): Promise<void> {
    await this.ready();
    this.walletSelectCallbacks.push(cb);
    cb(this.selectedWallet);
  }

  releaseWalletSelect (cb) {
    const index = this.walletSelectCallbacks.indexOf(cb);
    if (index === -1)
      return;
    this.walletSelectCallbacks.splice(index, 1);
  }

  async init () {
    this.initializeWeb3();
    await this.onReady();
    try {
      this.initiatives = await this.contractDefinition.deployed();
    } catch (e) {
      new Toast(
        "Initiatives contract was not deployed to the network. Issue \"migrate\" command"
        + " in Truffle console to fix this. " + e,
        Toast.TYPE_ERROR
      );
    }
    this.initialized = true;
    setInterval(() => pollWeb3ForAccounts(this), POLLING_INTERVAL);
  }

  async ready () {
    while (!this.initialized) { // sleep until ready
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return true;
  }

  initializeWeb3 () {

    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider); // Use existing (Mist/MetaMask's) provider
    } else {
      console.warn(`Development web3 provider is being created, ${ serverUrl }`);
      try {
        this.web3 = new Web3(new Web3.providers.HttpProvider(serverUrl));
      } catch (e) {
        console.error(e);
      }
    }

  };

  async onReady () {

    this.contractDefinition.setProvider(this.web3.currentProvider);

    // dirty hack for web3@1.0.0 support for localhost testrpc,
    // see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
    const contract = this.contractDefinition;
    if (typeof contract.currentProvider.sendAsync !== "function") {
      contract.currentProvider.sendAsync = function() {
        return contract.currentProvider.send.apply(
          contract.currentProvider, arguments
        );
      };
    }

    try {
      this.accounts = await this.web3.eth.getAccounts();
    } catch (e) {
      if (e) {
        new Toast(`An error occurred when fetching accounts: ${ e }`, Toast.TYPE_ERROR);
        return;
      }
    }

    if (this.accounts.length === 0) {
      new Toast(
        "Unable to get accounts or no accounts set up. Check if the node is up.",
        Toast.TYPE_ERROR
      );
      return;
    } else {
      this.setSelectedWallet(this.accounts[0]);
    }

  };

  async getAllAccounts() {

    await this.ready();

    return this.accounts = await this.web3.eth.getAccounts();

  }

  async createInitiative (contentHash: String, acceptance: Number): Promise<Number> {

    await this.ready();

    let id;

    try {
      id = (await this.initiatives.create(hex2a(contentHash), acceptance, {
        from: this.selectedWallet
      })).logs[0].args.id;
    } catch (e) {
      new Toast("Unable to create initiative: " + e, Toast.TYPE_ERROR);
    }

    // todo: contact GraphQL server and store initiative static data

    return id;

  };

  // General todo: getInitiativeById should contact GraphQL server and return content as well as
  // data from Blockchain.
  async getInitiativeById (id: Number) {

    let initiativeObj;
    let query = `{
      getContent(id: ${ id }) 
      {
        id,
        title, 
        description,
        latitude,
        longitude,
        image,
        cover,
        link
      }
    }`;

    await this.ready();
    try {
      initiativeObj = decodeGetInitiativeById(await this.initiatives.getInitiativeById(id, {
        from: this.selectedWallet
      }));
    } catch (e) {
      new Toast(`Error when getting initiative: ${ e }`, Toast.TYPE_ERROR);
    }

    try {
      Object.assign(initiativeObj, (await graphQlGet(query)).data.getContent);
    } catch (e) {
      new Toast(`Error when getting initiative by id: ${ e }`, Toast.TYPE_ERROR);
    }

    return initiativeObj;

  }

  async getOpenedInitiativesIds () {

    await this.ready();

    let openedInitiatives: number[];

    try {
      openedInitiatives = (await this.initiatives.getOpenedInitiativesIds());
    } catch (e) {
      new Toast("Unable to display all opened initiatives: " + e, Toast.TYPE_ERROR);
    }

    return openedInitiatives;

  }

  async getAllInitiatives () {

    await this.ready();

    const ids = await this.getOpenedInitiativesIds();
    try {
      return await Promise.all(ids.map((id) => {
        return this.getInitiativeById(id);
      }));
    } catch (e) {
      new Toast(`Unable to get all initiatives ${ e }`, Toast.TYPE_ERROR);
    }

  }

  async voteForInitiative (id = 1, positive = true) {

    await this.ready();

    try {
      await this.initiatives.vote(id, positive, {
        from: this.selectedWallet,
        gas: 30000000000
      });
    } catch (e) {
      new Toast("Unable to vote for initiative: " + e, Toast.TYPE_ERROR);
    }

  }

  async fundInitiative (id = 1, value = 0) {

    await this.ready();

    try {
      await this.initiatives.back(id, {
        from: this.selectedWallet,
        value: value,
        gas: 30000000000
      });
    } catch (e) {
      new Toast("Unable to vote for initiative: " + e, Toast.TYPE_ERROR);
    }

  }

}
