import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  title = 'Map for initiatives';
  lat = 50.431782;
  lng = 30.516382;

  constructor(private route: ActivatedRoute, private router: Router, private _userData: DataService) { }

  ngOnInit() {}


  placeMarker($event) {
    console.log($event.coords);
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    });

    this._userData.setUserData({ lat: $event.coords.lat, lng: $event.coords.lng });

    setTimeout(() => {
      this.router.navigate(['my-initiatives']);
    }, 1000 * 2);
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // });

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
  ];
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
