import "./about.css";
import profilePic from "../../assets/profilePic.jpg";

function About() {
  return (
    <div className="about">
      <div className="about__content">
        <img src={profilePic} alt="CJ Pic" className="about__image" />
        <div className="about__text-container">
          <h1 className="about__title">A little about me</h1>
          <p className="about__text">
            {" "}
            Hi, I'm C.J. - I’m a web developer who loves creating clean,
            responsive, and user-friendly applications. After spending more than
            20 years in retail leadership, I decided to make a big change and
            transition into software engineering through TripleTen’s full-stack
            program. Since then, I’ve built projects using JavaScript, React,
            Node.js, Express, and APIs — and I’ve learned how much I enjoy
            turning ideas into real, functional products.<br /><br /> Outside of tech,
            I’m a small-town country boy with a nerdy side, a love for Star
            Trek, and a habit of looking up random facts most people never think
            about — and somehow remembering all of them. I believe in staying
            curious, working hard, and enjoying the journey as much as the
            results.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
