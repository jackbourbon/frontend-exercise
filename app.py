import os.path, json
from flask import Flask, session
from IPython import embed
from random import randint

SRC_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(SRC_DIR, 'data')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'top-secret!'

def get_drivers():
    if not session.get('drivers'):
        with open(DATA_DIR + '/drivers.json') as data_file:
            session['drivers'] = json.load(data_file)
    return session['drivers']

def increment_points(driver_list):
    driver_index = (randint(0,len(driver_list)-1))
    driver_list[driver_index]['points'] = driver_list[driver_index]['points'] + 1
    return driver_list

def get_teams_by_id():
    if not session.get('teams_by_id'):
        with open(DATA_DIR + '/teams.json') as data_file:
            data = json.load(data_file)
            session['teams_by_id'] = dict(map(lambda x: (str(x['id']), x), data))
    return session['teams_by_id']

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/api/standings.json')
def standings():
    drivers = increment_points(get_drivers())
    return json.dumps(drivers)


@app.route('/api/team/<int:team_id>.json')
def team_details(team_id):
    teams_by_id = get_teams_by_id()
    return json.dumps(teams_by_id[str(team_id)])

if __name__ == '__main__':
    app.run(debug=True)
