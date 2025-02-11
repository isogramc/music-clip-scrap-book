import { useNavigate } from "react-router";

useNavigate

function TeamPage(){
    const navigate = useNavigate();
    const goBack = () => navigate('/');
    return (
      <div style={{display: 'flex', flexDirection: "column", textAlign: 'center', overflow: "hidden"}}>
        <div style={{height: '500px', width: '470px', overflow: "hidden", paddingBottom: "60px", marginTop: "-100px", marginLeft: "-30px"}}>
        <iframe
          style={{overflowY: 'hidden'}}
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
        ></iframe>
        </div>
        <div style={{width: '130px'}}><button onClick={goBack}>&lt;Back</button></div>
      </div>
    );
}

export default TeamPage