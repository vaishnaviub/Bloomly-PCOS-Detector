from utils.db import db

class WellnessTip(db.Model):
    __tablename__ = 'wellness_tips'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255))
