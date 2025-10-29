import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

MODEL_FILE = 'ml_model.pkl'

def train_dummy_model():
    """Train a simple dummy model for PCOS/PCOD detection"""
    X = np.array([
        [1, 0, 0, 0],  # no symptoms
        [0, 1, 1, 1],  # all symptoms
        [1, 1, 0, 0],
        [0, 1, 0, 1]
    ])
    y = np.array([0, 1, 0, 1])  # 0 = Negative, 1 = Positive
    model = RandomForestClassifier()
    model.fit(X, y)
    joblib.dump(model, MODEL_FILE)
    return model

def load_model():
    if os.path.exists(MODEL_FILE):
        return joblib.load(MODEL_FILE)
    else:
        return train_dummy_model()

model = load_model()

def predict(symptoms: dict):
    """symptoms dict: {'irregularPeriods': bool, 'acne': bool, 'hairLoss': bool, 'weightGain': bool}"""
    X = np.array([[int(symptoms['irregularPeriods']),
                   int(symptoms['acne']),
                   int(symptoms['hairLoss']),
                   int(symptoms['weightGain'])]])
    pred = model.predict(X)[0]
    return 'Positive' if pred == 1 else 'Negative'
