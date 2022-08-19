from flask import Flask, jsonify, request, g


from .db import get_db, close_db

app = Flask(__name__)
app.secret_key = 'sooper sekrit key'

@app.before_request
def connect_to_db():
    get_db()

@app.after_request
def disconnect_from_db(response):
    close_db()
    return response

# GET ROUTE
@app.route('/reviews')
def home():
    query = 'SELECT * FROM reviews ORDER BY date DESC LIMIT 10;'
    g.db['cursor'].execute(query)
    reviews = g.db['cursor'].fetchall()
    return (jsonify(reviews))

# GET ROUTE
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