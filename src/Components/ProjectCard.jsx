import {Link} from 'react-router'

function ProjectCard({ id, image, title, description,  mainDisplay, handleDelete }){
    const link = "/profile-keys/" + id;
    const deleteFunct = (e) => {
        e.preventDefault();
        handleDelete(id)
    }
    return(
        <div className="project-card">
            {image && <img src={image} alt="image for doodle"/>}
            <div className="project-card-info">
                {mainDisplay&&<h1><Link to={link}>{title}</Link></h1>}
                {!mainDisplay&&<h1>{title}</h1>}
                <p>{description}</p>
                {mainDisplay && <button onClick={deleteFunct}>Delete</button>}
            </div>
            
        </div>
    )    
}
export default ProjectCard
