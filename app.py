from flask import Flask, render_template, jsonify, request
import requests, json
app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/weather')
def weather() :
    requestParameters = request.args
    location = requestParameters['location']

    apiUrl = "http://api.weatherbit.io/v2.0/current"
    data = requests.get(apiUrl, params = { 'key': '37bb7f3b948c43f28cf4e665cb5d5e86', 'city': location })
    returnData = json.loads(data.text)

    return returnData

if __name__ == "__main__" :
    app.run(debug=True)
