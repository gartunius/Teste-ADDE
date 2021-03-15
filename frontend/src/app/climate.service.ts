import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimateService {
  private subject = new Subject<any>();
  private days = '3';

  constructor(private http: HttpClient) { }

  getWeatherInfoWithLocation(location: string) {
    let parameters = new HttpParams();
    parameters = parameters.set('location', location);

    return this.http.get(`http://localhost:5000/weather`, { params: parameters });
  }

  getWeatherInfoWithLatLon(latitude: string, longitude: string) {
    let parameters = new HttpParams();
    parameters = parameters.set('latitude', latitude);
    parameters = parameters.set('longitude', longitude);

    return this.http.get(`http://localhost:5000/weather`, { params: parameters });
  }

  getWeatherForecastWithLocation(location: string) {
    let parameters = new HttpParams();
    parameters = parameters.set('location', location);
    parameters = parameters.set('days', this.days);

    return this.http.get(`http://localhost:5000/weatherForecast`, { params: parameters });
  }

  getWeatherForecastWithLatLon(latitude: string, longitude: string) {
    let parameters = new HttpParams();
    parameters = parameters.set('latitude', latitude);
    parameters = parameters.set('longitude', longitude);
    parameters = parameters.set('days', this.days);

    return this.http.get(`http://localhost:5000/weatherForecast`, { params: parameters });
  }

}
