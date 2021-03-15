import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClimateService {

  constructor(private http: HttpClient) { }

  getClimateInfo(location: string) {
    let parameters = new HttpParams();

    parameters = parameters.set('location', location);

    this.http.get(`http://localhost:5000/tst`, { params: parameters }).toPromise().then( data => {
      console.log(data);
    });

  }

}
