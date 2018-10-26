from flask import Flask
from db_helper import *

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/event")
def event_registration():
	return "Event has NOT been registered!"

if __name__ == '__main__':
    app.run(debug=True)