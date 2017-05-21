import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PodatkiService } from '../shared/services/podatki.services';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PodatkiService]
})
export class HeaderComponent implements OnInit {

  data: any[] = [];
  dataCtrl: FormControl;
  filteredData: any;

  constructor(private PodatkiService: PodatkiService) {}

  filterData(val: string) {
    return val ? this.data.filter(s => new RegExp(`^${val}`, 'gi').test(s))
      : this.data;
  }

  ngOnInit() {
    this.PodatkiService.getVrsta().subscribe(
      response => {
        for (const el of response) {
          this.data.push(el.vrsta);
        }
        console.log(this.data);
      }
    );
    this.dataCtrl = new FormControl();
    this.filteredData = this.dataCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterData(name));
  }

}
