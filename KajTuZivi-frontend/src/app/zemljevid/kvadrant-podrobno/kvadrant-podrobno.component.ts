import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kvadrant-podrobno',
  templateUrl: './kvadrant-podrobno.component.html',
  styleUrls: ['./kvadrant-podrobno.component.css']
})
export class KvadrantPodrobnoComponent implements OnInit {
  elements: any = ['test1', 'test2', 'test3'];

  constructor() { }

  ngOnInit() {
  }

}
