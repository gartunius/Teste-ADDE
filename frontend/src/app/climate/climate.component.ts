import { Component, OnInit } from '@angular/core';
import { ClimateService } from '../climate.service';
import { WeatherDay } from '../weather-day';

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

    days: WeatherDay[];

    constructor(private climateService: ClimateService) { }

    ngOnInit(): void {
        navigator.geolocation.getCurrentPosition((position) => {
            var latitude = String(position.coords.latitude);
            var longitude = String(position.coords.longitude);

            this.climateService.getWeatherInfoWithLatLon(latitude, longitude).toPromise().then(data => {
                var jsonContent = data['data'][0];
                this.setData(jsonContent);
            }).catch(error => {
                console.log("Erro no request HTTP");
            });

            this.climateService.getWeatherForecastWithLatLon(latitude, longitude).toPromise().then(data => {
                var days: WeatherDay[] = [];

                for (let key in data['data']) {
                    var day = data['data'][key];

                    var datetime = data['data'][key]['datetime'];
                    var temperature = data['data'][key]['temp'];
                    var weather = data['data'][key]['weather']['description'];

                    days.push(<WeatherDay> {
                        temperature: temperature,
                        weather: weather,
                        date: datetime,
                    })
                }

                this.setDays(days);
            })
        })
    }

    checkWeather(): void {
        this.climateService.getWeatherInfoWithLocation(this.currentLocation).toPromise().then(data => {
            var jsonContent = data['data'][0];
            this.setData(jsonContent);
        });

        this.climateService.getWeatherForecastWithLocation(this.currentLocation).toPromise().then(data => {
            var days: WeatherDay[] = [];

            for (let key in data['data']) {
                var day = data['data'][key];

                var datetime = data['data'][key]['datetime'];
                var temperature = data['data'][key]['temp'];
                var weather = data['data'][key]['weather']['description'];

                days.push(<WeatherDay> {
                    temperature: temperature,
                    weather: weather,
                    date: datetime,
                })
            }

            this.setDays(days);
        })
    }

    private setData(jsonContent): void {
        this.currentLocation = String(jsonContent['city_name'])
        this.currentTemp = String(jsonContent['temp'])
        this.currentAppTem = String(jsonContent['app_temp'])
        this.currentPrecip = String(jsonContent['precip'])
        this.currentSnow = String(jsonContent['snow'])
        this.currentWeatherDescription = String(jsonContent['weather']['description'])
        this.currentIcon = String(jsonContent['weather']['icon'])
    }

    private setDays(days): void {
        this.days = days;
    }

}
