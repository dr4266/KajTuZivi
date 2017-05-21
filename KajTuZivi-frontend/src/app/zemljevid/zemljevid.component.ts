import {Component, ElementRef, OnInit, Output} from '@angular/core';
import { SebmGoogleMap, SebmGoogleMapPolygon, LatLngLiteral } from 'angular2-google-maps/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-zemljevid',
  templateUrl: './zemljevid.component.html',
  styleUrls: ['./zemljevid.component.css']
})
export class ZemljevidComponent implements OnInit {

  lat = 45.244760;
  lng = 13.275901;
  public table: any[] = [];
  lat1 = 45.344760;
  lat2 = 45.434760;
  lng1 = 13.414000;
  lng2 = 13.544000;

  spremembaY = 0;
  spremembaX = 0.09;

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 25; j++) {
        let paths: Array<LatLngLiteral> = [
          {lat: this.lat1, lng: this.lng1 + this.spremembaY},
          {lat: this.lat1, lng: this.lng2 + this.spremembaY},
          {lat: this.lat2, lng: this.lng2 + this.spremembaY},
          {lat: this.lat2, lng: this.lng1 + this.spremembaY}
        ];
        this.table.push(paths);
        this.spremembaY += 0.13;
      }
      this.spremembaY = 0;
      this.lat1 += this.spremembaX;
      this.lat2 += this.spremembaX;
    }
  }

  onMapClick(num: string) {
    console.log(num);
  }
}
