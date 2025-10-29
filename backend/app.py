from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import mysql.connector
from dotenv import load_dotenv

# Initialize Flask app first
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "OPTIONS"])

app.secret_key = "supersecretkey"

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        return jsonify({"status": "OK"}), 200

load_dotenv()

# ✅ MySQL connection function (reusable)
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

# ✅ Import blueprints *after* app is defined to avoid circular import
from routes.auth import auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")

# -------------------- MODEL LOADING --------------------
MODEL_PATH = "pcos_model_v3.pkl"
FEATURES_PATH = "model_features_v3.pkl"

if os.path.exists(MODEL_PATH) and os.path.exists(FEATURES_PATH):
    model = joblib.load(MODEL_PATH)
    model_features = joblib.load(FEATURES_PATH)
    print(f"✅ Loaded model and features from {MODEL_PATH}")
else:
    model, model_features = None, []
    print("⚠️ Model or feature file not found! Please run train_xgboost_model.py first.")


# -------------------- PREDICTION ROUTE --------------------
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        features = np.array([[ 
            float(data['age']),
            float(data['bmi']),
            float(data['amh']),
            float(data['fshLh']),
            int(data['irregularPeriods']),
            int(data['acne']),
            int(data['hairLoss']),
            int(data['weightGain']),
            int(data['darkening'])
        ]])

        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]

        prob_high = probabilities[1] if len(probabilities) > 1 else probabilities[0]
        prob_low = probabilities[0]
        confidence = round(float(max(prob_high, prob_low)) * 100, 2)
        pcos_risk = "High" if prob_high > prob_low else "Low"

        # Save prediction
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO user_predictions (user_id, age, bmi, amh, fshLh, pcos_risk, confidence)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (1, data['age'], data['bmi'], data['amh'], data['fshLh'], pcos_risk, confidence))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"pcos_risk": pcos_risk, "confidence": confidence})

    except Exception as e:
        print("❌ Error during prediction:", str(e))
        return jsonify({"error": str(e)}), 500


# -------------------- TRACKING ROUTE --------------------
@app.route('/tracking/<int:user_id>', methods=['GET'])
def get_tracking_data(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
        SELECT age, bmi, amh, fshLh, pcos_risk, confidence, created_at
        FROM user_predictions
        WHERE user_id = %s
        ORDER BY created_at DESC
        LIMIT 1
        """, (user_id,))
        record = cursor.fetchone()
        cursor.close()
        conn.close()

        if not record:
            return jsonify({"error": "No tracking data found"}), 404

        testosterone = round(record["amh"] * 12.5, 2)
        cycle_days = 32 if record["pcos_risk"] == "High" else 28
        progress = 65 if record["pcos_risk"] == "High" else 85

        response = {
            **record,
            "testosterone": testosterone,
            "cycle_days": cycle_days,
            "progress": progress
        }

        return jsonify(response)

    except Exception as e:
        print("❌ Error fetching tracking data:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
