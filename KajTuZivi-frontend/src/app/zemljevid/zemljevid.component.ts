import {Component, ElementRef, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-zemljevid',
  templateUrl: './zemljevid.component.html',
  styleUrls: ['./zemljevid.component.css']
})
export class ZemljevidComponent implements OnInit {

  stateCtrl: FormControl;
  public pos: any;
  lat = 20.678418;
  lng = 10.809007;

  ngOnInit() {
  navigator.geolocation.getCurrentPosition((position) => {
      this.lat=position.coords.latitude;
      this.lng=position.coords.longitude;
    });


}


}
