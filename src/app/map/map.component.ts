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
  lat: number
  lng: number
  zoom = 4;
  currentLocation: Object;
  visitMyInitiativesFlag: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private _userData: DataService, private _initiativeService: InitiativesService) {
  }

  ngOnInit() {
    this._initiativeService.windowLoaded();
    //set current position
    this.setCurrentPosition();
    this.visitMyInitiativesFlag = this._userData.getVisitMyInitiatives();
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(position.coords.latitude, position.coords.longitude);
        this.zoom = 12;
        this.currLoc.push({
          lat: this.lat,
          lng: this.lng,
          draggable: false,
        });
      });
    }
  }

  placeMarker($event) {
    console.log($event.coords);
    if (this.visitMyInitiativesFlag) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: false
      });

      this._userData.setInitiativeLocation({lat: $event.coords.lat, lng: $event.coords.lng});

      setTimeout(() => {
        this.router.navigate(['my-initiatives']);
      }, 1000 * 2);
    }
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]

  currLoc: currentLocationMarker[] = [];
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface currentLocationMarker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
