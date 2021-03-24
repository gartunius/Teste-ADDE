import { Component, OnInit } from '@angular/core';
import { ClimateService } from '../climate.service';
import { WeatherDay } from '../weather-day';

@Component({
    selector: 'app-climate',
    templateUrl: './climate.component.html',
    styleUrls: ['./climate.component.css']
})
export class ClimateComponent implements OnInit {
    currentLocation: string = 'campinas';
    currentTemp: string;
    currentAppTem: string;
    currentPrecip: string;
    currentSnow: string;
    currentWeatherDescription: string;
    currentIcon: string;

    days: WeatherDay[];

    constructor(private climateService: ClimateService) { }

    ngOnInit(): void {
        navigator.geolocation.getCurrentPosition((position) => {
            var latitude = String(position.coords.latitude);
            var longitude = String(position.coords.longitude);

            this.checkWeather('coords', latitude, longitude);
        })
    }

    /*
    * checkType = 'location' or 'coords'
    * latitude = string formated value
    * longitude = string formated value
    * */
    checkWeather(checkType:string, latitude:string, longitude:string): void {
        var values = [];

        if ( checkType == "location" ) {
            values = [ this.currentLocation ];

        } else if ( checkType == "coords" ) {
            values = [ latitude, longitude ];

        }

        this.climateService.getWeatherInfo(checkType, "current", values, null).toPromise().then(data => {
            var jsonContent = data['data'][0];

            this.currentLocation           = jsonContent['city_name'];
            this.currentTemp               = jsonContent['temp'];
            this.currentAppTem             = jsonContent['app_temp'];
            this.currentPrecip             = jsonContent['precip'];
            this.currentSnow               = jsonContent['snow'];
            this.currentWeatherDescription = jsonContent['weather']['description'];
            this.currentIcon               = jsonContent['weather']['icon'];
        });

        this.climateService.getWeatherInfo(checkType, "forecast", values, "3").toPromise().then(data => {
            var days: WeatherDay[] = [];

            for (let key in data['data']) {
                var datetime    = data['data'][key]['datetime'];
                var temperature = data['data'][key]['temp'];
                var weather     = data['data'][key]['weather']['description'];

                days.push(<WeatherDay> {
                    temperature: temperature,
                    weather: weather,
                    date: datetime,
                })
            }

            this.days = days;
        })
        
    }

}

