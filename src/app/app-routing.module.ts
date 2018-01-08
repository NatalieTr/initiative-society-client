import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { InfoComponent } from './info/info.component';
import { MyInitiativesComponent } from './my-initiatives/my-initiatives.component';
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
    path: 'my-initiatives',
    component: MyInitiativesComponent
  },
  {
    path: 'cabinet',
    component: CabinetComponent
  },
  {
    path: 'initiative/:id',
    component: InitiativeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
