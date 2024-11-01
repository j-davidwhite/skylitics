import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

def train_model_for_city(file_path, model_filename):
    print(f"Loading data from {file_path}")
    df = pd.read_csv(file_path, encoding='utf-8', delimiter=',', skiprows=3)
    
    df.rename(columns={
        'time': 'Date',
        'weather_code (wmo code)': 'WeatherCode',
        'temperature_2m_max (°C)': 'TempMax',
        'temperature_2m_min (°C)': 'TempMin',
        'temperature_2m_mean (°C)': 'MeanTemp',
        'apparent_temperature_max (°C)': 'MaxApparentTemp',
        'apparent_temperature_min (°C)': 'MinApparentTemp',
        'apparent_temperature_mean (°C)': 'MeanApparentTemp',
        'precipitation_sum (mm)': 'Rain',
        'wind_speed_10m_max (km/h)': 'WindSpeedMax'
    }, inplace=True)

    df['Date'] = pd.to_datetime(df['Date'], dayfirst=True, errors='coerce')
    df.dropna(subset=['Date'], inplace=True)

    df['Month'] = df['Date'].dt.month
    df['Year'] = df['Date'].dt.year
    df['DayOfWeek'] = df['Date'].dt.dayofweek

    df['PrevTempMax'] = df['TempMax'].shift(1)
    df['PrevTempMin'] = df['TempMin'].shift(1)
    df['PrevRain'] = df['Rain'].shift(1)
    df['PrevWindSpeedMax'] = df['WindSpeedMax'].shift(1)

    df.dropna(subset=['TempMax', 'TempMin', 'Rain', 'WindSpeedMax', 'PrevTempMax', 'PrevTempMin', 'PrevRain', 'PrevWindSpeedMax'], inplace=True)
    if df.empty:
        print(f"Warning: {file_path} resulted in an empty DataFrame after processing. Skipping model training.")
        return

    features = ['Month', 'Year', 'DayOfWeek', 'PrevTempMax', 'PrevTempMin', 'PrevRain', 'PrevWindSpeedMax']
    models = {}

    for target in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']:
        y = df[target]
        X_train, X_test, y_train, y_test = train_test_split(df[features], y, test_size=0.2, random_state=42)
        model = RandomForestRegressor()
        model.fit(X_train, y_train)
        models[target] = model

    for target, model in models.items():
        joblib.dump(model, f'{model_filename}_{target}.pkl')

    print(f"Models saved for {model_filename}")

train_model_for_city('data/weatherMLB.csv', 'modelMLB')
train_model_for_city('data/weatherBNE.csv', 'modelBNE')
train_model_for_city('data/weatherPER.csv', 'modelPER')
train_model_for_city('data/weatherSYD.csv', 'modelSYD')
