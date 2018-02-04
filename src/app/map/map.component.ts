import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {InitiativesService} from '../initiatives.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  title = 'Map for initiatives';
  lat: number = 50.45475807277256; // one of the initiatives in demo
  lng: number = 50.45475807277256;
  zoom = 4;
  currentLocation: Object;
  visitMyInitiativesFlag: boolean;
  allInitiatives: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userData: DataService,
    private _initiativeService: InitiativesService
  ) {

  }

  ngOnInit() {
    //set current position
    this.setCurrentPosition();
    this.visitMyInitiativesFlag = this._userData.getVisitMyInitiatives();
    this.placeInitiativesOnMap();
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
        this.currLoc.push({
          lat: this.lat,
          lng: this.lng,
          draggable: false,
        });
      });
    }
  }

  async placeInitiativesOnMap() {
    this.allInitiatives = await this._initiativeService.getAllInitiatives();
    this.markers = this.allInitiatives.map((initiative) => {
      return {
        lat: initiative.latitude,
        lng: initiative.longitude,
        label: initiative.title + " (" + (initiative.totalFunds/Math.pow(10,18)).toFixed(2) + ") ETH",
        draggable: false,
        id: initiative.id
      };
    });
  }

  showInitiative(id) {
   this.router.navigate([`initiative/${id}`]);
  }

  placeMarker($event) {
    if (this.visitMyInitiativesFlag) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: "",
        draggable: false
      });

      this._userData.setInitiativeLocation({lat: $event.coords.lat, lng: $event.coords.lng});

      setTimeout(() => {
        this.router.navigate(['new-initiative']);
      }, 1000 * 2);
    }
  }

  markers: marker[] = [];

  currLoc: currentLocationMarker[] = [];
}

interface marker {
  lat: number;
  lng: number;
  label: string;
  draggable: boolean;
}

interface currentLocationMarker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
