from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os

# Create FastAPI app
app = FastAPI()

# Define the path where models are stored
models_path = '/Users/dheemanthakar/Documents/skylitics/src/models'

# Load models dynamically from the models directory
model_files = {
    "PriceToSydney": "PriceToSydney_model.pkl",
    "PriceToBrisbane": "PriceToBrisbane_model.pkl",
    "PriceToPerth": "PriceToPerth_model.pkl"
}

models = {}
for city, model_file in model_files.items():
    model_path = os.path.join(models_path, model_file)
    if os.path.exists(model_path):
        models[city] = joblib.load(model_path)
        print(f"Loaded model: {model_file}")
    else:
        print(f"Warning: {model_file} not found in {models_path}")

# Define request schema
class PredictionRequest(BaseModel):
    day_of_week_encoded: int

@app.get("/models")
async def get_models():
    """Get a list of available models"""
    return {"available_models": list(models.keys())}

@app.post("/predict/{city}")
async def predict(city: str, request: PredictionRequest):
    """Predict flight prices for a given city and day of the week"""
    if city not in models:
        raise HTTPException(status_code=404, detail=f"Model for {city} not found")
    
    model = models[city]
    prediction = model.predict([[request.day_of_week_encoded]])
    
    return {"city": city, "predicted_price": prediction[0]}

# Add this block to run the app directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

