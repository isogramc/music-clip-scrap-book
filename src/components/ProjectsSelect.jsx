import { useEffect, useState } from "react"
import axios from "axios"
import './../App.css'

function ProjectsSelect({projects, selectProject}){
    const [selectedProject, setSelectedProject] = useState("");

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