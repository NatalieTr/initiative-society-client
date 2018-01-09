import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { InfoComponent } from './info/info.component';
import { NewInitiativeComponent } from './new-initiative/new-initiative.component';
import { InitiativesComponent } from './initiatives/initiatives.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { FormsModule } from '@angular/forms';
import { InitiativeComponent } from "./initiative/initiative.component";

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'initiatives',
    component: InitiativesComponent
  },
  {
    path: 'create-initiative',
    component: NewInitiativeComponent
  },
  {
    path: 'cabinet',
    component: CabinetComponent
  },
  {
    path: 'initiative/:id',
    component: InitiativeComponent
  },
  {
    path: 'new-initiative',
    component: NewInitiativeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
