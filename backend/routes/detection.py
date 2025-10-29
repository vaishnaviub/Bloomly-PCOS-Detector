from flask import Blueprint, request, jsonify
from utils.ml_model import predict

detection_bp = Blueprint('detection', __name__, url_prefix='/api')

@detection_bp.route('/detect', methods=['POST'])
def detect():
    data = request.json
    result = predict(data)
    return jsonify({"prediction": result})
