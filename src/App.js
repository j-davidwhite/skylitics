import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, useTheme } from "./components/ThemeContext"; // Ensure you import useTheme
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import About from "./pages/About";

function AppContent() {
  const { isLightMode } = useTheme(); // Use theme within a component inside ThemeProvider

  return (
    <div className={`App ${isLightMode ? "" : "dark"}`}>
      <Sidebar>Sidebar</Sidebar>
      <Header>Header</Header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Joshua White: 102363543, Aaron Hussain, Dheeman Thakar
        </a>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent /> {/* Move the content inside a component */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
