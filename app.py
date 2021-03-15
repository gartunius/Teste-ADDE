from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/tst')
def tst() :
    requestParameters = request.args
    print(requestParameters['location'])

    return jsonify({'text': 'hello world'})

if __name__ == "__main__" :
    app.run(debug=True)
