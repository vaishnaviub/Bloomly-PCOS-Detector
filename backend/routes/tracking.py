from flask import Blueprint, jsonify
from models.health import HealthRecord

tracking_bp = Blueprint('tracking', __name__, url_prefix='/api')

@tracking_bp.route('/tracking', methods=['GET'])
def get_tracking():
    records = HealthRecord.query.order_by(HealthRecord.date.desc()).all()
    return jsonify([{
        "date": r.date,
        "weight": r.weight,
        "cycleLength": r.cycle_length,
        "notes": r.notes
    } for r in records])
