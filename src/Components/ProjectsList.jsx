import { useEffect, useState } from "react"
import axios from "axios"
import ProjectCard from './ProjectCard'

function ProjectsList(){
    const [projects, setProjects] = useState([]);

    // this is the link to the LIVE SERVER
    const remote = `${import.meta.env.VITE_APP_API_URL_LOCAL}/projects`;
    const local = "http://localhost:5005/projects";

    async function getProjects() {
        try {
          // change the link depending on the environment 
          return await axios({url: local, 
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
            console.log(result.data);
            setProjects(result.data);
        });   
      }, [])

    if(projects.length===0){
        return <div>...Loading</div>
    }

    return (
        <div className="projectsList">
             {projects.map(project => <ProjectCard key={project.id} image={project.image} title={project.title} />)} 
        </div>
    )
}
export default ProjectsList