import { useNavigate } from "react-router";
import './styles/AboutPage.css';

function AboutPage() {
  const navigate = useNavigate();
  const goBack = () => navigate("/");
  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <div className="about-page">
        <div>
          <h1>Iron Project:</h1>
          <p>
            The Piano Tutor App aims to provide users with a platform for
            learning piano through interactive features, sharing and musical
            "play-alongs". By integrating with a web audio framework, users can
            experience a responsive and engaging learning environment.
          </p>

          <div>
        <iframe
          src="https://prezi.com/p/embed/mY6IVXCcNhuXQYL3ZXEM/"
          id="iframe_container"
          frameborder="0"
          webkitallowfullscreen=""
          mozallowfullscreen=""
          allowfullscreen=""
          allow="autoplay; fullscreen"
          height="315"
          width="560"
        ></iframe>
      </div>
          <h2>Iron Team:</h2>
          <p>
            Trix and Paulo are two aspiring developers at the beginning of their
            journey in the tech world.
          </p>

          <p>
            With creativity as their driving force, they are passionate about
            coding and constantly seeking opportunities to learn and grow.
            Together, they share a vision of building a bright and successful
            future as innovative and impactful developers.
          </p>
        </div>
        <div >
        <button onClick={goBack} style={{ width: "120px" }}>&lt; Back</button>
      </div>
       </div>
     
    </div>
  );
}

export default AboutPage;
