import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClimateService {

    constructor(private http: HttpClient) { }

    // locationIdentifier has to be either the name of the city or it's coordenates.
    getWeatherInfo(locationIdentifier: string, checkType:string, values:string[], days:string) {
        let parameters = new HttpParams();

        parameters = parameters.set('locationID', locationIdentifier);
        if ( locationIdentifier == "coords" ) {
            parameters = parameters.set('latitude', values[0]);
            parameters = parameters.set('longitude', values[1]);

        } else if ( locationIdentifier == "location" ){
            parameters = parameters.set('location', values[0]);
        }

        if (checkType == "forecast") {
            parameters = parameters.set('type', 'forecast');
            parameters = parameters.set('days', days);

        } else {
            parameters = parameters.set('type', 'current');
        }

        return this.http.get(`http://localhost:5000/WeatherCheck`, { params: parameters });
    }

}
