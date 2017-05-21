import {Component, Input, OnInit} from '@angular/core';
import { PodatkiService } from '../../shared/services/podatki.services';

@Component({
  selector: 'app-vrste-podrobno',
  templateUrl: './vrste-podrobno.component.html',
  styleUrls: ['./vrste-podrobno.component.css'],
  providers: [PodatkiService]
})
export class VrstePodrobnoComponent implements OnInit {
  @Input() data: any;
  vrsta: any;

  constructor(private PodatkiService: PodatkiService) { }

  ngOnInit() {}
}
