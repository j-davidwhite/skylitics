# Project Setup and Run Instructions

Welcome! Follow these steps to set up and run the application.

### Prerequisites

1. **Python 3.8+**
2. **Node.js** (version 14+ recommended)

### Setup Instructions

1. **Extract and Open Project in VS Code**

   - Unzip the project folder.
   - Open the folder in Visual Studio Code (VS Code).

2. **Install Python Dependencies**

   - Open the terminal in VS Code.
   - Ensure you’re in the root project directory where `requirements.txt` is located.
   - Install the Python dependencies by running:

```bash
      pip install -r requirements.txt
```

3. **Install Node Modules for Frontend**
   - From the root project directory, install the Node.js dependencies by running:

```bash
      npm install
```

### Running the Application

1. **Train Models**

   - Navigate to the `src` directory.
   - Run the following command to train the machine learning models:

```bash
      python train_all_models.py
```

2. **Run the Backend**

   - While still in the `src` directory, start the FastAPI backend server by running.

```bash
      python app.py
```

3. **Run the Frontend**
   - Open a new terminal and ensure you’re in the root project directory.
   - Start the frontend server by running:

```bash
      npm start
```

The application should now be running. Access it by navigating to `http://localhost:3000` in your web browser.
