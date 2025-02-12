import { useEffect, useState } from "react"
import axios from "axios"
import './../App.css'

function ProjectsSelect({params, selectProject}){
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");

     // this is the link to the LIVE SERVER
     const remote = `${import.meta.env.VITE_APP_API_URL}/songs`;
     const local = "http://localhost:5005/songs";


      async function getProjectsWithParams() {
        try {
          // change the link depending on the environment 
          return await axios({url: remote, 
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            },
            params: params
          })
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        console.log(params);
        if(params?.userId>-1){
          getProjectsWithParams().then(function (result) {
            console.log(result.data);
            setProjects(result.data);
          });
        }
         
      }, [])

    if(projects.length===0){
        return <div>...Loading</div>
    }

    const handleChange=(e)=>{
      let id = e.target.value;
      selectProject(id);
    }

    return (
        <div className="projects-list-opt">
          <select name="project-select-opt" onChange={e=>handleChange(e)}>
              <option value="">Select project</option>
             {projects.map(project => 
                <option key={project.id} value={project.id}>{project.title}</option>
             )} 
          </select>
        </div>
    )
}
export default ProjectsSelect