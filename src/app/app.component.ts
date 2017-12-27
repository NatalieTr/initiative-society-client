import { Component } from '@angular/core';
import { InitiativesService } from "./initiatives.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Initiative Society';

  constructor (private initiativesService: InitiativesService) {
    initiativesService.init().then();
    console.log('InitiativesService for testing:', initiativesService);
  }

}
