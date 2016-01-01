import os.path, json
from flask import Flask, session, jsonify
from random import randint

SRC_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(SRC_DIR, 'data')

app = Flask(__name__)
app.config.from_object(__name__)

app.config['SECRET_KEY'] = 'top-secret!'

def get_data_from_file(filename):
    data = None
    with open(DATA_DIR + '/' + filename) as data_file:
        data = json.load(data_file)
    return data

def increment_points(driver_list):
    driver_index = (randint(0,len(driver_list)-1))
    driver_list[driver_index]['points'] = driver_list[driver_index]['points'] + 1
    return driver_list

def update_drivers(drivers_data):
    with open(DATA_DIR + '/drivers.json', 'w') as outfile:
        json.dump(drivers_data, outfile)

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/api/standings.json')
def standings():
    drivers =  get_data_from_file('drivers.json')
    drivers_updated = increment_points(drivers)
    update_drivers(drivers_updated)
    return json.dumps(drivers_updated)


@app.route('/api/team/<int:team_id>.json')
def team_details(team_id):
    teams = get_data_from_file('teams.json')
    for team in teams:
        if team['id'] == team_id:
            return json.dumps(team)
    return  jsonify(error=404, text="Not found"), 404

if __name__ == '__main__':
    app.run(debug=True)
