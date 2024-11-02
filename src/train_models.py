# Importing necessary libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Define the path for the cleaned dataset
file_path = '/Users/dheemanthakar/Documents/Assignment2/FlightPrices_Daily.csv'  # Updated path

# Load the cleaned dataset from the CSV file
try:
    df_filtered = pd.read_csv(file_path)
    if df_filtered.empty:
        print("Error: The dataset is empty. Please check the CSV file.")
        exit()
    print("Dataset loaded successfully.")
    print(df_filtered.head())  # Display the first few rows for verification
except FileNotFoundError:
    print(f"Error: File not found at {file_path}")
    exit()

# Replace 'No flights' text with 0 and then replace all NaN values with 356
df_filtered.replace('No flights', 0, inplace=True)  # Replace 'No flights' with 0
df_filtered.fillna(356, inplace=True)  # Replace all NaN values with 356
print("Replaced 'No flights' with 0 and all NaN values with 356.")
print(f"Number of rows after cleaning: {len(df_filtered)}")

# Check unique values in 'DayOfWeek' column
print("Unique values in 'DayOfWeek' column before conversion:")
print(df_filtered['DayOfWeek'].unique())

# Ensure 'DayOfWeek' column is uniformly strings before encoding
df_filtered['DayOfWeek'] = df_filtered['DayOfWeek'].astype(str)

# Check unique values after conversion
print("Unique values in 'DayOfWeek' column after conversion:")
print(df_filtered['DayOfWeek'].unique())

# Encode 'DayOfWeek' as a numeric feature using LabelEncoder
le = LabelEncoder()
df_filtered['DayOfWeek_Encoded'] = le.fit_transform(df_filtered['DayOfWeek'])

# Convert price columns to numeric after removing '$' symbols
price_columns = ['PriceToSydney', 'PriceToBrisbane', 'PriceToPerth']
for col in price_columns:
    df_filtered[col] = df_filtered[col].replace('[\\$,]', '', regex=True).astype(float)

# Prepare data for linear regression
X = df_filtered[['DayOfWeek_Encoded']]  # Independent variable (encoded day of the week)

# Define city labels and file paths for saving models
output_path = os.path.join(os.path.dirname(__file__), 'models')
os.makedirs(output_path, exist_ok=True)  # Create the directory if it doesn't exist
print(f"Directory for saving models: {output_path}")

cities = {
    'PriceToSydney': 'PriceToSydney_model.pkl',
    'PriceToBrisbane': 'PriceToBrisbane_model.pkl',
    'PriceToPerth': 'PriceToPerth_model.pkl'
}

# Create subplots for the linear regression plots
fig, axes = plt.subplots(1, 3, figsize=(15, 5), sharey=True)
fig.suptitle('Linear Regression: Flight Prices Based on Day of the Week')

# Train and save models for each city if there are enough samples
for i, (city, model_filename) in enumerate(cities.items()):
    try:
        y = df_filtered[city]  # Dependent variable (flight prices)
    except KeyError:
        print(f"Error: Column '{city}' not found in the dataset.")
        continue

    # Check if there are enough samples to train the model
    if len(X) < 2 or len(y) < 2:
        print(f"Error: Not enough data to train and test for {city}. Skipping this model.")
        continue

    # Split the data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create and train the linear regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Save the trained model as a pickle file
    model_path = os.path.join(output_path, model_filename)
    print(f"Saving model to {model_path}")
    joblib.dump(model, model_path)
    print(f"Model {model_filename} saved successfully")

    # Make predictions on the test set
    y_pred = model.predict(X_test)

    # Plot the results
    axes[i].scatter(X_test, y_test, color='blue', label='Actual Prices')
    axes[i].plot(X_test, y_pred, color='red', label='Predicted Prices')
    axes[i].set_title(f'{city}')
    axes[i].set_xlabel('Day of the Week (Encoded)')
    axes[i].set_ylabel('Flight Price')
    axes[i].legend()

# Show the plot
plt.tight_layout()
plt.show()

