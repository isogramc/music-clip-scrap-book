function ProjectCard({ id, image, title, description,  mainDisplay, handleDelete }){
    const deleteFunct = (e) => {
        e.preventDefault();
        handleDelete(id)
    }
    return(
        <div className="project-card">
            {image && <img src={image} alt="image for doodle"/>}
            <div className="project-card-info">
                <h1>{title}</h1>
                <p>{description}</p>
                {mainDisplay && <button onClick={deleteFunct}>Delete</button>}
            </div>
            
        </div>
    )    
}
export default ProjectCard
