import { useNavigate } from "react-router";
import './styles/AboutPage.css'

function TeamPage(){
    const navigate = useNavigate();
    const goBack = () => navigate('/');
    return (
      <div className="about-page">
        <div style={{  overflow: "hidden", width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              height: "500px",
              width: "470px",
              overflow: "hidden",
              paddingBottom: "60px",
              marginTop: "-100px",
              marginLeft: "-30px",
            }}
          >
           <p align="center"> <iframe
              style={{
                overflowY: "hidden",
                display: "block",
                textAlign: "center",
              }}
              src="https://prezi.com/i/g5a4cfbig_wu/"
              id="iframe_container"
              frameborder="0"
              webkitallowfullscreen=""
              mozallowfullscreen=""
              allowfullscreen=""
              allow="autoplay; fullscreen"
              height="580"
              width="560"
              scrolling="no"
            ></iframe></p>
          </div>
        </div>
       
        <div className="about-wrapper2">
        <h1>Find us:</h1>
        <div className="team-links">
          <div className="team-member">
            <h2>Paulo</h2>
            <a
              href="https://github.com/paulroar"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/paulo-prado-a2a37157/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <div className="team-member">
            <h2>Trix Mostert</h2>
            <a
              href="https://github.com/isogramc"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/trixmostert/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

          <button onClick={goBack} style={{ width: "120px", marginTop: '30px' }}>
            &lt; Back
          </button>
          </div>
      </div>
    );
}

export default TeamPage