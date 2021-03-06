import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';
import { InitiativesComponent } from './initiatives/initiatives.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { InfoComponent } from './info/info.component';
import { DataService } from './data.service';
import { InitiativesService } from './initiatives.service';
import { FormsModule } from '@angular/forms';
import { InitiativeComponent } from './initiative/initiative.component';
import { NewInitiativeComponent } from './new-initiative/new-initiative.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InitiativesComponent,
    CabinetComponent,
    InfoComponent,
    InitiativeComponent,
    NewInitiativeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDc0wCrgs4VNTDP2w8clFGNUmcHTmLOa6U'
    }),
    FormsModule,
  ],
  providers: [DataService, InitiativesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
