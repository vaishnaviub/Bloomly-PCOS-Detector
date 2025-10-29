import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# === Load data ===
data = pd.read_csv("pcos_data.csv")

# === Clean column names (strip spaces for safety) ===
data.columns = data.columns.str.strip()

# === Define feature columns based on your dataset ===
feature_cols = [
    "Age (yrs)",
    "BMI",
    "FSH/LH",
    "AMH(ng/mL)",
    "Weight gain(Y/N)",
    "hair growth(Y/N)",
    "Skin darkening (Y/N)",
    "Hair loss(Y/N)",
    "Pimples(Y/N)",
]

target_col = "PCOS (Y/N)"

# === Drop missing target values ===
data = data.dropna(subset=[target_col])

# === Extract features & target ===
X = data[feature_cols].copy()
y = data[target_col]

# === Convert categorical Y/N columns to numeric ===
yn_cols = [
    "Weight gain(Y/N)",
    "hair growth(Y/N)",
    "Skin darkening (Y/N)",
    "Hair loss(Y/N)",
    "Pimples(Y/N)",
]

for col in yn_cols:
    if col in X.columns:
        X[col] = X[col].map({"Y": 1, "N": 0}).fillna(0).astype(int)

# === Convert remaining numeric columns safely ===
num_cols = [c for c in X.columns if c not in yn_cols]
for col in num_cols:
    X[col] = pd.to_numeric(X[col], errors="coerce")  # convert invalids to NaN

# === Fill missing numeric values with median ===
X[num_cols] = X[num_cols].fillna(X[num_cols].median())

# === Split data ===
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# === Train Random Forest model ===
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
)
model.fit(X_train, y_train)

# === Evaluate ===
y_pred = model.predict(X_test)
accuracy = round(accuracy_score(y_test, y_pred), 3)

print("\n✅ Model trained successfully!")
print(f"🔹 Accuracy: {accuracy}")
print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))

# === Save trained model ===
joblib.dump(model, "pcos_model.pkl")
print("\n💾 Model saved as 'pcos_model.pkl'")

# === Optional: Save column order for prediction use ===
joblib.dump(feature_cols, "model_features.pkl")
print("📁 Saved feature column list as 'model_features.pkl'")
