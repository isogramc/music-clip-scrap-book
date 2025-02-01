import { useEffect, useState } from "react"
import axios from "axios"

function ProjectsList(){
    const [projects, setProjects] = useState([]);

    async function getProjects() {
        try {
          return await axios({url: 'http://localhost:5005/projects', 
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
        let dataObj;
        getProjects().then(function (result) {
        console.dir(result.data); // Ooops, the result is undefined
        setProjects(result.data);
        });   
      }, [])

    

    return (
        <div>
            {projects.map(project=>{
                <div>
                    <img src={project.image} alt="image for doodle"/>
                    {project.title}
                </div>
            })
            }
        </div>
    )
}
export default ProjectsList