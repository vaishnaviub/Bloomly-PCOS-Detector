from flask import Blueprint, jsonify
from models.wellness import WellnessTip

wellness_bp = Blueprint('wellness', __name__, url_prefix='/api')

@wellness_bp.route('/wellness', methods=['GET'])
def get_wellness():
    tips = WellnessTip.query.all()
    return jsonify([{"text": t.text} for t in tips])
