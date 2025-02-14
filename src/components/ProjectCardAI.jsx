import { Link } from 'react-router'
function ProjectCardAI({ id, image, title, description, handleDelete }){
    const deleteFunct = (e) => {
        e.preventDefault();
        console.log(id);
        handleDelete(id)
    }
    return (
      <div className="project-card">
        <img src={image} alt="image for song" />
        <div className="project-card-info">
          <Link to={`/edit/${id}`}>
            <h1>{title}</h1>
          </Link>
          <p>{description}</p>
          <button onClick={deleteFunct}>Delete </button>
        </div>
      </div>
    );
}
export default ProjectCardAI