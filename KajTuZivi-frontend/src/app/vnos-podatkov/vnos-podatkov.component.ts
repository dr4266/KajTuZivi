import { Component, OnInit } from '@angular/core';
import {PodatkiService} from '../shared/services/podatki.services';
@Component({
  selector: 'app-vnos-podatkov',
  templateUrl: './vnos-podatkov.component.html',
  styleUrls: ['./vnos-podatkov.component.css']
})
export class VnosPodatkovComponent implements OnInit {

  constructor(private podatkiService: PodatkiService) { }

  ngOnInit() {
  }

}


