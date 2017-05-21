import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Config} from '../config/env.config';

@Injectable ()
export class PodatkiService {

  public kvadrant: any;

  constructor(private http: Http) {}

  vstaviPopis(podatki: any) {
    return this.http.post(Config.API + 'popisi/', podatki)
      .map((res: Response) => res.json());
  }

  getBiologe() {
    return this.http.get(Config.API + 'uporabniki/')
      .map((res: Response) => res.json());
  }

  getKvadrant(id: number) {
    return this.http.get(Config.API + 'popisi?quadrant=' + id)
      .map((res: Response) => res.json());
  }

  getVrsta() {
    return this.http.get(Config.API + 'popisi')
      .map((res: Response) => res.json());
  }

  getVrstaIme(name: any) {
    return this.http.get(Config.API + 'popisi?species=' + name)
      .map((res: Response) => res.json());
  }

  public setKvadrant(data: any) {
    console.log('check' + data);
    this.kvadrant = data;
    console.log('kvadr: ' + this.kvadrant);
  }

  public getKvadrant1() {
    return this.kvadrant;
  }
}
