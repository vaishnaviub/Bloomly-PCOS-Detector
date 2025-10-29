from utils.db import db

class HealthRecord(db.Model):
    __tablename__ = 'health_records'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    weight = db.Column(db.Float)
    cycle_length = db.Column(db.Integer)
    notes = db.Column(db.String(255))
