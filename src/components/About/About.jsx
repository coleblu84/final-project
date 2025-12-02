import "./about.css"
import profilePic from "../../assets/profilePic.jpeg"

function About() {
    return (
        <div className="about"> 
            <div className="about__content">
              <img 
                    src={profilePic} 
                    alt="CJ Pic" 
                    className="about__image"
                />
        <div className="about__text-container">    
      <h1 className="about__title">About the author</h1>
      <p className="about__text"> about me area </p>
        </div>
        </div>
        </div>
    );
}

export default About;
