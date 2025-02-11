import { useNavigate } from "react-router";

useNavigate

function AboutPage(){
    const navigate = useNavigate();
    const goBack = () => navigate('/');
    return (
      <div style={{display: 'flex', flexDirection: "column", textAlign: 'center'}}>
        <div><iframe
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
        <div style={{width: '120px'}}><button onClick={goBack}>&larr; Back</button></div>
      </div>
    );
}

export default AboutPage