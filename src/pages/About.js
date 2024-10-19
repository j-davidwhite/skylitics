import React from "react";
import "./About.css";
import photo1 from "../assets/joshua.memoji.png";
import photo2 from "../assets/dheeman.memoji.png";
import photo3 from "../assets/aaron.memoji.png";
import team_name from "../assets/oreo97.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
import analytics from "../assets/icons8-analytics.png";
import weather from "../assets/icons8-weather.png";
import flight from "../assets/icons8-flight.png";

const About = () => {
  return (
    <div className="about">
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
              <img src={flight} alt="Feature 1" className="feature-icon" />
            </div>
            <p>Accurate Delay Predictions</p>
          </div>
          <div className="feature">
            <div className="icon-container">
              <img src={weather} alt="Feature 2" className="feature-icon" />
            </div>
            <p>Weather Impact Analysis</p>
          </div>
          <div className="feature">
            <div className="icon-container">
              <img src={analytics} alt="Feature 3" className="feature-icon" />
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
              <img className="photo1" src={photo1} />
            </div>
            <div className="profile-info">
              <div className="name">Joshua White</div>
              <div className="role">Frontend Developer</div>
            </div>

            <div className="icons">
              <img src={instagram}></img>
              <img src={github}></img>
              <img src={linkedin}></img>
            </div>
          </div>
          <div className="profile">
            <div className="circle">
              <img className="photo2" src={photo2} />
            </div>
            <div className="profile-info">
              <div className="name">Aaron Hussain</div>
              <div className="role">Machine Learning Engineer</div>
            </div>

            <div className="icons">
              <img src={instagram}></img>
              <img src={github}></img>
              <img src={linkedin}></img>
            </div>
          </div>
          <div className="profile">
            <div className="circle">
              <img className="photo3" src={photo3} />
            </div>
            <div className="profile-info">
              <div className="name">Dheeman Thakar</div>
              <div className="role">Backend Developer</div>
            </div>

            <div className="icons">
              <img src={instagram}></img>
              <img src={github}></img>
              <img src={linkedin}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="team-container">
        <img src={team_name} className="team-name"></img>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default About;
