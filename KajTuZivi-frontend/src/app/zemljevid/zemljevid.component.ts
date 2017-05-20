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

  lat = 51.678418;
  lng = 7.809007;

  ngOnInit() {
  }

}
