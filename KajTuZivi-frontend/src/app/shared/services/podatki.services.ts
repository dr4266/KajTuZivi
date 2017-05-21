import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Config} from '../config/env.config';

@Injectable ()
export class PodatkiService {

  constructor(private http: Http) {}

  vstaviPopis(podatki: any) {
    return this.http.post(Config.API + 'popisi/', podatki)
      .map((res: Response) => res.json());
  }

  getBiologe() {
    return this.http.get(Config.API + 'uporabniki/')
      .map((res: Response) => res.json())
  }
}
