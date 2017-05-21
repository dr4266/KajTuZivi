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

  lat = 0;
  lng = 0;
  public table: any[] = [];
  x1 = 0;
  x2 = 1;
  y1 = 0;
  y2 = 1;
  spremembaY = 0;
  spremembaX = 1;

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let paths: Array<LatLngLiteral> = [
          {lat: this.x1, lng: this.y1 + this.spremembaY},
          {lat: this.x1, lng: this.y2 + this.spremembaY},
          {lat: this.x2, lng: this.y2 + this.spremembaY},
          {lat: this.x2, lng: this.y1 + this.spremembaY}
        ];
        this.table.push(paths);
        this.spremembaY++;
      }
      this.spremembaY = 0;
      this.x1 += this.spremembaX;
      this.x2 += this.spremembaX;
    }
  }
}
