function ProjectCard({ image, title, description }){
    return(
        <div className="project-card">
            {image && <img src={image} alt="image for doodle"/>}
            <div className="project-card-info">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )    
}
export default ProjectCard
