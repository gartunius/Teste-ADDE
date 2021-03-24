from flask import Flask, render_template, request
import requests, json
app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/WeatherCheck')
def weatherCheck() :
    apiUrl = ""
    parameters = {}
    requestParameters = request.args
    type              = requestParameters['type']
    locationID        = requestParameters['locationID']

    if locationID == "location" :
        location = requestParameters['location']
        parameters = {
            'key': '37bb7f3b948c43f28cf4e665cb5d5e86',
            'city': location 
        }
    elif locationID == "coords" :
        latitude = requestParameters['latitude']
        longitude = requestParameters['longitude']

        parameters = {
            'key': '37bb7f3b948c43f28cf4e665cb5d5e86',
            'lat': latitude,
            'lon': longitude,
        }

    if type == "forecast" :
        apiUrl = "http://api.weatherbit.io/v2.0/forecast/daily"
        days = requestParameters['days']
        parameters['days'] = days

    elif type == "current":
        apiUrl = "http://api.weatherbit.io/v2.0/current"

    data = requests.get(apiUrl, params = parameters)
    returnData = json.loads(data.text)
    
    return returnData


if __name__ == "__main__" :
    app.run()

