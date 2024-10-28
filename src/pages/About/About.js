import React from "react";
import "./About.css";
import { useTheme } from "../../components/ThemeContext";
import photo1 from "../../assets/joshua.memoji.png";
import photo2 from "../../assets/dheeman.memoji.png";
import photo3 from "../../assets/aaron.memoji.png";
import oreoLight from "../../assets/oreo-light.png";
import oreoDark from "../../assets/oreo-dark.png";
import instagram from "../../assets/instagram.png";
import linkedin from "../../assets/linkedin.png";
import githubLight from "../../assets/icons8-github-light.png";
import githubDark from "../../assets/icons8-github-dark.png";
import analytics from "../../assets/icons8-analytics.png";
import weather from "../../assets/icons8-weather.png";
import flight from "../../assets/icons8-flight.png";
import analyticsDark from "../../assets/icons8-analytics-dark.png";
import weatherDark from "../../assets/icons8-weather-dark.png";
import flightDark from "../../assets/icons8-flight-dark.png";

const About = () => {
  const { isLightMode } = useTheme();

  return (
    <div className={`about ${isLightMode ? "" : "dark"}`}>
      <div className="project-container">
        <h2>About Our Project</h2>
        <div className="project-info">
          Welcome to our Flight Delay Predictor, a web-based application
          designed to help you predict potential delays in your flights based on
          historical data and current weather patterns. By leveraging machine
          learning algorithms and real-time data, we aim to provide accurate
          delay forecasts so you can plan your journey with greater confidence.
        </div>
      </div>

      <div className="features-container">
        <h2>Key Features</h2>
        <div className="features-info">
          <div className="feature">
            <div className="icon-container">
              <img
                src={isLightMode ? flight : flightDark}
                alt="Flight Prediction Feature"
                className="feature-icon"
              />
            </div>
            <p>Accurate Delay Predictions</p>
          </div>
          <div className="feature">
            <div className="icon-container">
              <img
                src={isLightMode ? weather : weatherDark}
                alt="Weather Analysis Feature"
                className="feature-icon"
              />
            </div>
            <p>Weather Impact Analysis</p>
          </div>
          <div className="feature">
            <div className="icon-container">
              <img
                src={isLightMode ? analytics : analyticsDark}
                alt="Analytics Feature"
                className="feature-icon"
              />
            </div>
            <p>Real-Time Data Integration</p>
          </div>
        </div>
      </div>

      <div className="profile-container">
        <h2>Our Team</h2>
        <div className="profile-section">
          <div className="profile">
            <div className="circle">
              <img className="photo1" src={photo1} alt="Joshua White Profile" />
            </div>
            <div className="profile-info">
              <div className="name">Joshua White</div>
              <div className="role">Frontend Developer</div>
            </div>
            <div className="icons">
              <img src={instagram} alt="Instagram" />
              <img src={isLightMode ? githubLight : githubDark} alt="GitHub" />
              <img src={linkedin} alt="LinkedIn" />
            </div>
          </div>
          <div className="profile">
            <div className="circle">
              <img
                className="photo2"
                src={photo2}
                alt="Dheeman Thakar Profile"
              />
            </div>
            <div className="profile-info">
              <div className="name">Dheeman Thakar</div>
              <div className="role">Machine Learning Engineer</div>
            </div>
            <div className="icons">
              <img src={instagram} alt="Instagram" />
              <img src={isLightMode ? githubLight : githubDark} alt="GitHub" />
              <img src={linkedin} alt="LinkedIn" />
            </div>
          </div>
          <div className="profile">
            <div className="circle">
              <img
                className="photo3"
                src={photo3}
                alt="Aaron Hussain Profile"
              />
            </div>
            <div className="profile-info">
              <div className="name">Aaron Hussain</div>
              <div className="role">Backend Developer</div>
            </div>
            <div className="icons">
              <img src={instagram} alt="Instagram" />
              <img src={isLightMode ? githubLight : githubDark} alt="GitHub" />
              <img src={linkedin} alt="LinkedIn" />
            </div>
          </div>
        </div>
      </div>
      <div className="team-container">
        <img
          src={isLightMode ? oreoLight : oreoDark}
          alt="Team Logo"
          className="team-name"
        />
        <div className="line"></div>
      </div>
    </div>
  );
};

export default About;
