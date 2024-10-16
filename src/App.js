import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "./components/ThemeContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Sidebar>Sidebar</Sidebar>
        <Navbar>Navbar</Navbar>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Joshua White: 102363543, Aaron Hussain, Dheeman Thakar,
          </a>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
