from flask import Flask, jsonify, session, request, g
import json
import click
from werkzeug.security import generate_password_hash
import psycopg2
import os

from .db import get_db, close_db

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

@app.before_request
def connect_to_db():
    get_db()

@app.after_request
def disconnect_from_db(response):
    close_db()
    return response

# GET retrieve all reviews
@app.route('/reviews')
def home():
    query = 'SELECT * FROM reviews ORDER BY date DESC LIMIT 10;'
    g.db['cursor'].execute(query)
    reviews = g.db['cursor'].fetchall()
    return (jsonify(reviews))

# GET retrieve single review
@app.route('/reviews/<review_id>')
def show_review(review_id):
    cur = g.db['cursor']
    query = """
        SELECT * FROM reviews
        JOIN users ON reviews.user_id = users.id
        WHERE reviews.id = %s
    """
    cur.execute(query, (review_id,))
    review = cur.fetchone()
    print("hello")
    return jsonify(review)

# PUT update single review
@app.route('/reviews/<review_id>', methods=['PUT'])
def update_review(review_id):
    text = request.json['text']
    query = """
        UPDATE reviews
        SET text = %s
        WHERE reviews.id = %s
        RETURNING *
    """
    cur = g.db['cursor']
    cur.execute(query, (text, review_id))
    g.db['connection'].commit()
    review = g.db['cursor'].fetchone()
    return jsonify(review)

# DELETE remove single review
@app.route('/reviews/<review_id>', methods=['DELETE'])
def delete_review(review_id):
    query = """
        DELETE FROM reviews
        WHERE id = %s
        RETURNING *
    """
    cur = g.db['cursor']
    cur.execute(query, (review_id))
    g.db['connection'].commit()
    review = g.db['cursor'].fetchone() 
    return jsonify(review)

# POST create single review
@app.route('/reviews/new', methods=['POST'])
def new_review():
    text = request.json['text']
    user = session.get("user", None)
    if user is None:
        return jsonify(msg="You must be logged in to leave a review")
    toot = request.json['toot_id']
    query = """
        INSERT INTO reviews
        (text, user_id, toot_id)
        VALUES (%s, %s, %s)
        RETURNING *
    """
    g.db['cursor'].execute(query, (text, user["id"], toot))
    g.db['connection'].commit()
    review = g.db['cursor'].fetchone()
    return jsonify(review)

# GET retrieve single reviewer
@app.route('/reviewers/<username>')
def show_user(username):
    cur = g.db['cursor']
    query = """
        SELECT * FROM users
        JOIN reviews ON users.id = reviews.user_id
        WHERE users.name = %s
        ORDER BY date DESC
    """
    cur.execute(query, (username,))
    reviews = cur.fetchall()
    username = reviews[0]['name']
    return jsonify(username=username, reviews=reviews)

# POST register user
@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    password_hash = generate_password_hash(password)
    query = """
    INSERT INTO users
    (username, password_hash)
    VALUES (%s, %s)
    RETURNING id, username
    """
    cur = g.db['cursor']

    try:
        cur.execute(query, (username, password_hash))
    except psycopg2.IntegrityError:
        return jsonify(success=False, msg='Username already taken')

    g.db['connection'].commit()
    user = cur.fetchone()
    session['user'] = user
    return jsonify(success=True, user=user)

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    query = """
        SELECT * FROM users
        WHERE username = %s
    """
    cur = g.db['cursor']
    cur.execute(query, (username,))
    user = cur.fetchone()

    if user is None:
        return jsonify(success=False, msg='Username or password is incorrect')

    password_matches = check_password_hash(user['password_hash'], password)

    if not password_matches:
        return jsonify(success=False, msg='Username or password is incorrect')

    user.pop('password_hash')
    session['user'] = user
    return jsonify(success=True, user=user)

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify(success=True)

@app.route('/is-authenticated')
def is_authenticated():
    user = session.get('user', None)
    if user:
        return jsonify(success=True, user=user)
    else:
        return jsonify(success=False, msg='User is not logged in')

# GET retrieve toilet
@app.route('/nearest')
def get_nearest():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    cur = g.db['cursor']
    query = """
        SELECT * FROM toots
        WHERE lat > %s AND lat < %s AND lng > %s AND lng < %s
    """
    cur.execute(query, (lat - 0.01, lat + 0.01, lng - 0.01, lng + 0.01))
    closest_toilets = cur.fetchall()
    return jsonify(closest_toilets=closest_toilets)


# take this and make it's own file and import into app.py to be able to run populate-toilets
# when rerunnning this script, need to drop the existing database so no duplicates
def toBoolean(arg):
    return arg == 'True'

def insert_one(toilet):
    query = """
        INSERT INTO toots
        (facilities_id, toilet_name, male, female, unisex, allgender, open_hours, accessible, lat, lng)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    tuple = (int(toilet["FacilityID"]), toilet["Name"], toBoolean(toilet["Male"]), toBoolean(toilet["Female"]), toBoolean(toilet["Unisex"]), toBoolean(toilet["AllGender"]), toilet["OpeningHours"], toBoolean(toilet["Accessible"]), float(toilet["Latitude"]), float(toilet["Longitude"]))
    g.db['cursor'].execute(query, tuple)
    g.db['connection'].commit()

@app.cli.command("populate-toilets")
def populate_toilets():
    get_db()
    # Opening JSON file
    f = open('toilet-data.json')
    
    # returns JSON object as 
    # a dictionary
    data = json.load(f)

    # Iterating through the json list
    for i, row in enumerate(data):
        if i % 1000 == 0:
            print("written", i)
        insert_one(row)
    
    # Closing file
    f.close()