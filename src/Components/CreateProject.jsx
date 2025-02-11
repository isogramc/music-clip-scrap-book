import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProject({ userId, setProjects }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      image: "",
      duration: 0,
      genre: "",
    });
  
    const remote = `${import.meta.env.VITE_APP_API_URL_LOCAL}/songs`;
    const local = "http://localhost:5005/songs";
  

    const create = async (e) => {
      e.preventDefault();
  
      const dataObj = {
        ...formData,
        userId: userId !== undefined ? userId : 2,
      };
  
      try {
        const response = await makePost(dataObj);
  
        if (setProjects) {
          setProjects((prevProjects) => [...prevProjects, response.data]);
        }
  
        setFormData({
          title: "",
          description: "",
          image: "",
          duration: 0,
          genre: "",
        });
  
        navigate("/profile");
      } catch (err) {
        console.error("Error creating project:", err);
      }
    };
  
    const makePost = async (data) => {
      const response = await axios.post(local, data);
      return response;
    };
  
    useEffect(() => {
      const seed = Math.random().toString(36).substr(2, 8); // random string
      const randomImageUrl = `https://picsum.photos/seed/${seed}/400/300`;
      setFormData((prev) => ({ ...prev, image: randomImageUrl }));
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
        <form onSubmit={create} className="create-form">
            <label htmlFor="title" className="cp-label">Title</label>
            <input name="title" type="text" value={formData.title} onChange={handleChange} className="cp-input"/>
            
            <label htmlFor="description" className="cp-label">Description</label>
            <input name="description" type="text" value={formData.description} onChange={handleChange} className="cp-input"/>
            
            <label htmlFor="image" className="cp-label">Image</label>
            <input name="image" type="text" value={formData.image} onChange={handleChange} className="cp-input"/>
            
            <label htmlFor="genre" className="cp-label">Genre</label>
            <input name="genre" type="text" value={formData.genre} onChange={handleChange} className="cp-input"/>
            <input type="submit" value="Create"/>
        </form>
    )
}
export default CreateProject