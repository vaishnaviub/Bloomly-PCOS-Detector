import pandas as pd

data = pd.read_csv("pcos_data.csv")
print("🧾 Columns in your dataset:")
print(list(data.columns))
