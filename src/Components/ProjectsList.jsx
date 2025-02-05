import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import ProjectCard from './ProjectCard'

function ProjectsList(props){
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [mainDisplay, setMainDisplay] = useState(false);

     // this is the link to the LIVE SERVER
     const remote = `${import.meta.env.VITE_APP_API_URL_LOCAL}/songs`;
     const local = "http://localhost:5005/songs";
 
     const handleDelete = async (id) => {
      // change the link depending on the environment 
      const url = local + '/' + id;
         try {
          const res = await axios.delete(url);
        } catch (error) {
          console.error(error);
        }
     }

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

      async function getProjectsWithParams() {
        try {
          // change the link depending on the environment 
          return await axios({url: local, 
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            },
            params: props.params
          })
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        if(props.params?.userId>-1){
          setMainDisplay(true);
          getProjectsWithParams().then(function (result) {
            console.log(result.data);
            setProjects(result.data);
          });  
        }else{
          setMainDisplay(false);
          getProjects().then(function (result) {
            console.log(result.data);
            setProjects(result.data);
          });  
        }
         
      }, [])

    if(projects.length===0){
        return <div>...Loading</div>
    }

    return (
        <div className="projects-list">
             {projects.map(project => <ProjectCard key={project.id} id={project.id} image={project.image} title={project.title} description={project.description} mainDisplay={mainDisplay} handleDelete={handleDelete} />)} 
        </div>
    )
}
export default ProjectsList