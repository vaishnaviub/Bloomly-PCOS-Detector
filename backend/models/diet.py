from utils.db import db

class DietRecommendation(db.Model):
    __tablename__ = 'diet_recommendations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(255))
