import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kvadrant-podrobno',
  templateUrl: './kvadrant-podrobno.component.html',
  styleUrls: ['./kvadrant-podrobno.component.css']
})
export class KvadrantPodrobnoComponent implements OnInit {
  @Input() kvadrantPodatki: any;

  constructor() { }

  ngOnInit() {
  }

}
