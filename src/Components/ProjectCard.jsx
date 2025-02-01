function ProjectCard({ image, title }){
    return(
        <div className="projectCard">
            {image && <img src={image} alt="image for doodle"/>}
            <h1>{title}</h1>
        </div>
    )    
}
export default ProjectCard
