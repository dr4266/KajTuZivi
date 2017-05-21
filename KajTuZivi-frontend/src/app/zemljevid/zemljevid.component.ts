import {Component, ElementRef, OnInit, Output} from '@angular/core';
import { SebmGoogleMap, SebmGoogleMapPolygon, LatLngLiteral } from 'angular2-google-maps/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {range} from "rxjs/observable/range";

@Component({
  selector: 'app-zemljevid',
  templateUrl: './zemljevid.component.html',
  styleUrls: ['./zemljevid.component.css']
})
export class ZemljevidComponent implements OnInit {

  lat: number = 0;
  lng: number = 0;
  public table: any[] = [];
  x1 = 0;
  x2 = 1;
  y1 = 0;
  y2 = 1;
  spremembaY = 0;
  spremembaX = 1;

  latA = 1;
  lngA = 1;

  latB = 2;
  lngB = 2;

  // paths: Array<LatLngLiteral> = [
  //   { lat: 0,  lng: 0 },
  //   { lat: 0,  lng: 1 },
  //   { lat: 1, lng: 1 },
  //   { lat: 1, lng: 0 }
  // ];
  //
  // paths1: Array<LatLngLiteral> = [
  //   { lat: 0,  lng: 10 },
  //   { lat: 0,  lng: 20 },
  //   { lat: 10, lng: 20 },
  //   { lat: 10, lng: 10 }
  // ];
  //
  // paths2: Array<LatLngLiteral> = [
  //   { lat: 0,  lng: 20 },
  //   { lat: 0,  lng: 30 },
  //   { lat: 10, lng: 30 },
  //   { lat: 10, lng: 20 }
  // ];

  ngOnInit() {
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
