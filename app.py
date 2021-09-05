from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
from wtforms import Form, validators
from wtforms.fields.html5 import URLField
import json
import string
import random

app = Flask(__name__)
CORS(app)

class UrlForm (Form):
    url = URLField('url', [validators.URL(message='Please enter a valid url')])

def createId():
    # make a 5 char string
    return ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(7))

def createShort(url):
    id = createId()
    with open('url.json', 'r') as f:
        data = json.load(f)
    data[str(id)] = str(url)
    with open('url.json', 'w') as f:
        json.dump(data, f)
    return 'http://localhost:5000/'+str(id)
    
@app.route('/post', methods=['POST'])
def post():
    if request.method == 'POST':
        url = request.get_json()['url']
        validate = UrlForm(url=url).validate()
        if validate:
            short = createShort(url)
            return jsonify(short=short)

    return {
        'error' : 'Enter a valid url'
    }
    
    return jsonify({
        'status': 'error',
        'message': 'Invalid request'
    })

@app.route('/<id>')
def get(id):
    with open('url.json', 'r') as f:
        url = json.load(f)
    return redirect(location=url[id], code=302)

if __name__ == '__main__':
    app.run(debug=True)
