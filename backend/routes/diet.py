from flask import Blueprint, jsonify
from models.diet import DietRecommendation

diet_bp = Blueprint('diet', __name__, url_prefix='/api')

@diet_bp.route('/diet', methods=['GET'])
def get_diet():
    diets = DietRecommendation.query.all()
    return jsonify([{"name": d.name, "description": d.description} for d in diets])
