from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import joblib
import os
import pandas as pd

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; restrict to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Define the path where models are stored
models_path = 'models'  # Path set to 'models' for consistency

# Load price models dynamically from the models directory
price_models = {
    "PriceToSydney": "PriceToSydney_model.pkl",
    "PriceToBrisbane": "PriceToBrisbane_model.pkl",
    "PriceToPerth": "PriceToPerth_model.pkl"
}

price_models_loaded = {}
for city, model_file in price_models.items():
    model_path = os.path.join(models_path, model_file)
    if os.path.exists(model_path):
        price_models_loaded[city] = joblib.load(model_path)
        print(f"Loaded price model: {model_file}")
    else:
        print(f"Warning: {model_file} not found in {models_path}")

# Load weather models
weather_models = {
    'MLB': {target: joblib.load(f'{models_path}/modelMLB_{target}.pkl') for target in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']},
    'BNE': {target: joblib.load(f'{models_path}/modelBNE_{target}.pkl') for target in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']},
    'PER': {target: joblib.load(f'{models_path}/modelPER_{target}.pkl') for target in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']},
    'SYD': {target: joblib.load(f'{models_path}/modelSYD_{target}.pkl') for target in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']}
}

# Request schemas
class PricePredictionRequest(BaseModel):
    day_of_week_encoded: int

class WeatherPredictionRequest(BaseModel):
    date: str
    destination: Optional[str] = 'MLB'

# Utility function for preparing input for weather models
def prepare_weather_input(date):
    date_obj = pd.to_datetime(date)
    month = date_obj.month
    year = date_obj.year
    day_of_week = date_obj.dayofweek
    prev_values = {'PrevTempMax': 20, 'PrevTempMin': 10, 'PrevRain': 0, 'PrevWindSpeedMax': 15}
    print("Preparing input data:", {"month": month, "year": year, "day_of_week": day_of_week, **prev_values})  # Log prepared values
    return pd.DataFrame([[month, year, day_of_week] + list(prev_values.values())],
                        columns=['Month', 'Year', 'DayOfWeek', 'PrevTempMax', 'PrevTempMin', 'PrevRain', 'PrevWindSpeedMax'])

# Utility function for generating weather predictions
def get_weather_predictions(model_dict, input_data):
    predictions = {}
    for target, model in model_dict.items():
        if not hasattr(model, 'predict'):
            raise ValueError(f"{target} model is not valid for prediction.")
        predictions[target] = model.predict(input_data)[0]
        print(f"Prediction for {target}:", predictions[target])  # Log each prediction
    return predictions

# Price prediction endpoint
@app.post("/predict_price/{city}")
async def predict_price(city: str, request: PricePredictionRequest):
    if city not in price_models_loaded:
        raise HTTPException(status_code=404, detail=f"Model for {city} not found")
    
    model = price_models_loaded[city]
    prediction = model.predict([[request.day_of_week_encoded]])
    print(f"Predicted price for {city} on day {request.day_of_week_encoded}:", prediction[0])  # Log the price prediction
    return {"city": city, "predicted_price": prediction[0]}

# Weather prediction endpoint
@app.post("/predict_weather")
async def predict_weather(request: WeatherPredictionRequest):
    try:
        print("Received weather prediction request:", request.dict())  # Log incoming request
        input_data = prepare_weather_input(request.date)
        print("Input data for weather model:", input_data)  # Log prepared input data

        # Fetch predictions
        melbourne_predictions = get_weather_predictions(weather_models['MLB'], input_data)
        destination_predictions = get_weather_predictions(weather_models[request.destination], input_data)
        
        response = {
            "maxTempMelbourne": round(melbourne_predictions['TempMax']),
            "minTempMelbourne": round(melbourne_predictions['TempMin']),
            "rainMelbourne": round(melbourne_predictions['Rain']),
            "windSpeedMelbourne": round(melbourne_predictions['WindSpeedMax']),

            "maxTempDestination": round(destination_predictions['TempMax']),
            "minTempDestination": round(destination_predictions['TempMin']),
            "rainDestination": round(destination_predictions['Rain']),
            "windSpeedDestination": round(destination_predictions['WindSpeedMax']),

            "delayMessage": "No delay expected"  # Customize based on your logic
        }

        print("Response prepared for weather prediction:", response)  # Log the response data
        return response

    except Exception as e:
        print("Error during weather prediction:", str(e))  # Log the error
        raise HTTPException(status_code=500, detail="Weather prediction failed")

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)