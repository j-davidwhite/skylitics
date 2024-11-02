from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

models = {
    'MLB': {target: joblib.load(f'models/modelMLB_{target}.pkl') for target in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']},
    'BNE': {target: joblib.load(f'models/modelBNE_{target}.pkl') for target in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']},
    'PER': {target: joblib.load(f'models/modelPER_{target}.pkl') for target in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']},
    'SYD': {target: joblib.load(f'models/modelSYD_{target}.pkl') for target in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']}
}

def prepare_input(date):
    date_obj = pd.to_datetime(date)
    month = date_obj.month
    year = date_obj.year
    day_of_week = date_obj.dayofweek
    prev_values = {'PrevTempMax': 20, 'PrevTempMin': 10, 'PrevRain': 0, 'PrevWindSpeedMax': 15}
    return pd.DataFrame([[month, year, day_of_week] + list(prev_values.values())],
                        columns=['Month', 'Year', 'DayOfWeek', 'PrevTempMax', 'PrevTempMin', 'PrevRain', 'PrevWindSpeedMax'])

def get_predictions(model_dict, input_data):
    predictions = {}
    for target, model in model_dict.items():
        try:
            if not hasattr(model, 'predict'):
                raise ValueError("The provided model is not valid for prediction.")
            predictions[target] = model.predict(input_data)[0]
        except Exception as e:
            print(f"Error during {target} model prediction:", str(e))
            raise
    return predictions

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("Received data:", data)

    try:
        date = data.get('date')
        destination = data.get('destination', 'MLB')
        input_data = prepare_input(date)
        print("Input data for prediction:", input_data)

        melbourne_predictions = get_predictions(models['MLB'], input_data)
        destination_predictions = get_predictions(models[destination], input_data)

        if not all(key in melbourne_predictions for key in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']):
            raise ValueError("Melbourne predictions have missing keys")
        if not all(key in destination_predictions for key in ['TempMax', 'TempMin', 'Rain', 'WindSpeedMax']):
            raise ValueError("Destination predictions have missing keys")
        
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

        return jsonify(response)

    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
