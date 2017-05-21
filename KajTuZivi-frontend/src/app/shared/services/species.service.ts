import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable ()
export class SpeciesService {

  constructor(private http: Http) {}

  queryVrste(query: String) {
    return this.http.get('http://api.gbif.org/v1/species/suggest?rank=SPECIES&q=' + query)
      .map((res: Response) => res.json());
  }
}
