import {Component, OnInit} from '@angular/core';
import { SebmGoogleMap, SebmGoogleMapPolygon, LatLngLiteral } from 'angular2-google-maps/core';
import { PodatkiService } from '../shared/services/podatki.services';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-zemljevid',
  templateUrl: './zemljevid.component.html',
  styleUrls: ['./zemljevid.component.css'],
  providers: [PodatkiService]
})
export class ZemljevidComponent implements OnInit {

  lat = 45.344760;
  lng = 13.414000;
  public table: any[] = [];
  lat1 = 45.344760;
  lat2 = 45.434760;
  lng1 = 13.414000;
  lng2 = 13.544000;

  kvadrantPodatki: any;
  prikaziKvadrantPodatki = false;
  prikaziVrstePodrobno = false;
  prikaziKvadrant = false;
  kvadrant: number;

  spremembaY = 0;
  spremembaX = 0.09;

  constructor(private PodatkiService: PodatkiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 25; j++) {
        const paths: Array<LatLngLiteral> = [
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

  onMapClick(id: number) {
    this.kvadrant = id;
    this.prikaziKvadrant = true;
    this.PodatkiService.getKvadrant(id).subscribe(
      response => {
        this.kvadrantPodatki = response;
        if (response.length === 0) {
          this.prikaziKvadrantPodatki = false;
        } else {
          this.prikaziKvadrantPodatki = true;
        }
      }
    );
  }

  onVnesi() {
    this.router.navigate(['data/input/'], {relativeTo: this.route});
  }
}
