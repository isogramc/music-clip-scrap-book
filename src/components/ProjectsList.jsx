import { useEffect, useState } from "react"
import { Link } from "react-router"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"
import ProjectCardDisplay from "./ProjectCardDisplay";

function ProjectsList(){

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

     // this is the link to the LIVE SERVER
     const remote = `${import.meta.env.VITE_APP_API_URL}/songs`;

    async function getProjects() {
        try { 
          return await axios({url: remote, 
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            }
          })
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
          getProjects().then(function (result) {
            //console.log(result.data);
            setProjects(result.data);
          })
      }, []);

    if(!projects){
        return <div>...Loading</div>
    }

      return (
        <div className="projects-list">
          {projects?.map(project => 
            <ProjectCardDisplay key={project.id} id={project.id} image={project.image} title={project.title} description={project.description} />
          )} 
        </div>
      )
   
}
export default ProjectsList