# train_xgboost_model.py
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report
import xgboost as xgb
import joblib

# Load dataset
data = pd.read_csv("pcos_data.csv")

# Clean column names
data.columns = data.columns.str.strip()

# Handle missing values
data = data.dropna(subset=['PCOS (Y/N)'])

# Define features (added hormonal + diagnostic features)
features = [
    'Age (yrs)',
    'BMI',
    'AMH(ng/mL)',
    'FSH/LH',
    'Irregular Periods(Y/N)',
    'Pimples(Y/N)',
    'Hair loss(Y/N)',
    'Weight gain(Y/N)',
    'Skin darkening (Y/N)'
]

# Filter dataset
X = data[features]
y = data['PCOS (Y/N)']

# Convert object columns to numeric
X = X.apply(pd.to_numeric, errors='coerce')
y = pd.to_numeric(y, errors='coerce')

# Drop rows with NaNs
mask = ~X.isna().any(axis=1) & ~y.isna()
X = X[mask]
y = y[mask]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Define base model
xgb_clf = xgb.XGBClassifier(
    objective='binary:logistic',
    eval_metric='logloss',
    use_label_encoder=False,
    random_state=42
)

# Define hyperparameter grid
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.05, 0.1],
    'subsample': [0.7, 0.8, 1.0],
    'colsample_bytree': [0.7, 0.8, 1.0],
}

print("🔍 Running hyperparameter tuning... (this may take a few minutes)")

# Grid Search
grid_search = GridSearchCV(
    estimator=xgb_clf,
    param_grid=param_grid,
    scoring='accuracy',
    cv=3,
    verbose=1,
    n_jobs=-1
)

grid_search.fit(X_train, y_train)

# Get best model
best_model = grid_search.best_estimator_
print("\n✅ Best parameters found:", grid_search.best_params_)

# Evaluate
y_pred = best_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"\n✅ Final Model Accuracy: {accuracy:.4f}\n")
print("📊 Classification Report:")
print(classification_report(y_test, y_pred))

# Save model and features
joblib.dump(best_model, "pcos_model_v3.pkl")
joblib.dump(features, "model_features_v3.pkl")

print("\n💾 Model saved as 'pcos_model_v3.pkl'")
