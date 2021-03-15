from flask import Flask, render_template, jsonify, request
import requests, json
app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/weather')
def weatherCheck() :
    apiUrl = "http://api.weatherbit.io/v2.0/current"
    requestParameters = request.args

    try:
        location = requestParameters['location']
        data = requests.get(apiUrl, params = { 'key': '37bb7f3b948c43f28cf4e665cb5d5e86', 'city': location })
    except KeyError:
        latitude = requestParameters['latitude']
        longitude = requestParameters['longitude']
        data = requests.get(apiUrl, params = { 'key': '37bb7f3b948c43f28cf4e665cb5d5e86', 'lat': latitude, 'lon': longitude })

    returnData = json.loads(data.text)
    
    return returnData

@app.route('/weatherForecast')
def weatherForecast() :
    apiUrl = "http://api.weatherbit.io/v2.0/forecast/daily"
    requestParameters = request.args

    try:
        location = requestParameters['location']
        days = requestParameters['days']
        data = requests.get(apiUrl, params = { 'key': '37bb7f3b948c43f28cf4e665cb5d5e86', 'city': location, 'days': days })
    except KeyError:
        latitude = requestParameters['latitude']
        longitude = requestParameters['longitude']
        days = requestParameters['days']
        data = requests.get(apiUrl, params = { 'key': '37bb7f3b948c43f28cf4e665cb5d5e86', 'lat': latitude, 'lon': longitude, 'days': days })

    returnData = json.loads(data.text)
    
    return returnData


if __name__ == "__main__" :
    app.run(debug=True)
