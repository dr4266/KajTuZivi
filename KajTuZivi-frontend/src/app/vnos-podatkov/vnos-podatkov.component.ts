import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import {PodatkiService} from '../shared/services/podatki.services';
import {MdAutocompleteModule} from '@angular/material';
import { SpeciesService } from '../shared/services/species.service';

@Component({
  selector: 'app-vnos-podatkov',
  templateUrl: './vnos-podatkov.component.html',
  styleUrls: ['./vnos-podatkov.component.css']
})
export class VnosPodatkovComponent implements OnInit {

  public iucns: any = ['EX', 'EW', 'CR', 'EN', 'VU', 'NT', 'LC'];
  public loading: boolean;
  public success: boolean;
  public vrsta: any;
  public error: any;
  public filteredVrste: any;
  public vrstaCtrl: FormControl;

  constructor(private podatkiService: PodatkiService,
              private speciesService: SpeciesService) {
    this.vrstaCtrl = new FormControl();
    this.filteredVrste = this.vrstaCtrl.valueChanges.subscribe(
      (text: String) => {
        this.filteredVrste = [];
        this.speciesService.queryVrste(text).subscribe(
          response => {
            // console.log(response);
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
    this.loading = false;
    this.success = false;
    this.error = null;
  }

  onSubmit(f: any){
    this.loading = true;
    this.success = false;
    this.error = null;
    f.value.kanonicno_ime = this.vrstaCtrl.value;
    f.value.biolog = parseInt(f.value.biolog);

  	this.podatkiService.vstaviPopis(f.value).subscribe(
  		response => {
        this.loading = false;
        this.success = true;
        // console.log(response)
      },
  		error => {
        this.loading = false;
        this.error = JSON.parse(error._body);
        if (this.error) {
          this.error = this.error.message;
        }
        // console.log(error)
      },
  	);
  }

}
