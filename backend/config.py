import os
   
# config.py
from dotenv import load_dotenv

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'supersecretkey')
    SQLALCHEMY_DATABASE_URI = os.environ.get(
    'DATABASE_URL',
    'mysql+pymysql://root:vaishu@localhost:3306/pcos_db'
)
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Add these two 👇
    DATASET_PATH = os.getenv("DATASET_PATH", "pcos_data.csv")
    MODEL_PATH = os.getenv("MODEL_PATH", "pcos_model.pkl")
