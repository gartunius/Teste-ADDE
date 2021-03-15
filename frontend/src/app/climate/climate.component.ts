import { Component, OnInit } from '@angular/core';
import { ClimateService } from '../climate.service';

@Component({
    selector: 'app-climate',
    templateUrl: './climate.component.html',
    styleUrls: ['./climate.component.css']
})
export class ClimateComponent implements OnInit {
    private iconUrl = "https://www.weatherbit.io/static/img/icons/";

    currentLocation: string = 'campinas';
    currentTemp: string;
    currentAppTem: string;
    currentPrecip: string;
    currentSnow: string;
    currentWeatherDescription: string;
    currentIcon: string;
    weatherData: string[];

    constructor(private climateService: ClimateService) { }

    ngOnInit(): void {
    }

    checkWeather(): void {
        this.climateService.getClimateInfo(this.currentLocation).toPromise().then(data => {
            var jsonContent = data['data'][0];

            this.currentLocation = String(jsonContent['city_name'])
            this.currentTemp = String(jsonContent['temp'])
            this.currentAppTem = String(jsonContent['app_temp'])
            this.currentPrecip = String(jsonContent['precip'])
            this.currentSnow = String(jsonContent['snow'])
            this.currentWeatherDescription = String(jsonContent['weather']['description'])
            this.currentIcon = String(jsonContent['weather']['icon'])

            console.log(jsonContent);
        });
    }

}
