from flask import Blueprint, request, jsonify, current_app
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

# ✅ Blueprint
auth_bp = Blueprint('auth_bp', __name__)

load_dotenv()

# ✅ MySQL helper function
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

# ✅ Register route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({"message": "All fields are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
        (name, email, hashed_password)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "User registered successfully"}), 201


# ✅ Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    # ✅ Ensure secret key exists
    secret = current_app.config.get("SECRET_KEY") or current_app.secret_key
    if not secret:
        return jsonify({"message": "Server misconfigured: Missing secret key"}), 500

    # ✅ Generate JWT safely
    token = jwt.encode(
        {"email": email, "exp": (datetime.utcnow() + timedelta(hours=5)).timestamp()},
        secret,
        algorithm="HS256"
    )

    # ✅ Ensure name field exists
    user_name = user.get("name") or user.get("username") or "User"

    return jsonify({
        "message": "Login successful",
        "token": token,
        "name": user_name,
        "email": user.get("email", "")
    }), 200
