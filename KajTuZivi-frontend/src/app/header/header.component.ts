import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpeciesService } from '../shared/services/species.service';
import {MdAutocompleteModule} from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [SpeciesService]
})
export class HeaderComponent implements OnInit {

  public filteredVrste: any;
  vrstaCtrl: FormControl;

  constructor(private speciesService: SpeciesService) {
    this.vrstaCtrl = new FormControl();
    this.filteredVrste = this.vrstaCtrl.valueChanges.subscribe(
      (text: String) => {
        this.filteredVrste = [];
        this.speciesService.queryVrste(text).subscribe(
          response => {
            for (const vrsta of response) {
              this.filteredVrste.push(vrsta.canonicalName);
            }
          },
          error => {
            console.log(error);
          }
        );
      });
  }

  ngOnInit() {
    this.filteredVrste = [];
  }

  onSubmit(f: any) {
    f.value.kanonicno_ime = this.vrstaCtrl.value;
    console.log(f.value);
  }

}
