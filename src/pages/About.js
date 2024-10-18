import React from "react";
import "./About.css";
import photo1 from "../assets/joshua.memoji.png";
import photo2 from "../assets/dheeman.memoji.png";
import photo3 from "../assets/aaron.memoji.png";
import team_name from "../assets/oreo97.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";

const About = () => {
  return (
    <div className="about">
      <div>Our Team</div>
      <div className="profile-container">
        <div className="profile">
          <div className="circle">
            <img className="photo" src={photo2} />
          </div>

          <div className="name">name</div>
          <div className="role">web developer</div>

          <div className="icons">
            <img src={instagram}></img>
            <img src={github}></img>
            <img src={linkedin}></img>
          </div>
        </div>
        <div className="profile">
          <div className="circle">
            <img className="photo" src={photo2} />
          </div>

          <div className="name">name</div>
          <div className="role">web developer</div>

          <div className="icons">
            <img src={instagram}></img>
            <img src={github}></img>
            <img src={linkedin}></img>
          </div>
        </div>
        <div className="profile">
          <div className="circle">
            <img className="photo" src={photo2} />
          </div>

          <div className="name">name</div>
          <div className="role">web developer</div>

          <div className="icons">
            <img src={instagram}></img>
            <img src={github}></img>
            <img src={linkedin}></img>
          </div>
        </div>
      </div>

      <img src={team_name}></img>
    </div>
  );
};

export default About;
