import { useState } from 'react';

function ProjectCardDisplay({ id, image, title, description, genre }){

    return(
        <div className="project-card">
            <img src={image} alt="image for project"/>
            <div className="project-card-info">
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{genre}</p>
            </div> 
        </div>
    )    
}
export default ProjectCardDisplay
