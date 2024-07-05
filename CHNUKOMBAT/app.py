from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///clicker_game.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.String(50), unique=True, nullable=False)
    score = db.Column(db.Float, default=0.0)
    points = db.Column(db.Integer, default=0)
    additional_clicks = db.Column(db.Integer, default=0)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update_score', methods=['POST'])
def update_score():
    data = request.get_json()
    user = User.query.filter_by(telegram_id=data['telegram_id']).first()
    if not user:
        user = User(telegram_id=data['telegram_id'])
        db.session.add(user)
    user.score = data['score']
    user.points = data['points']
    user.additional_clicks = data['additional_clicks']
    db.session.commit()
    return jsonify({'status': 'success'})

@app.route('/get_user_data', methods=['POST'])
def get_user_data():
    data = request.get_json()
    user = User.query.filter_by(telegram_id=data['telegram_id']).first()
    if user:
        return jsonify({
            'score': user.score,
            'points': user.points,
            'additional_clicks': user.additional_clicks
        })
    return jsonify({'score': 0.0, 'points': 0, 'additional_clicks': 0})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
