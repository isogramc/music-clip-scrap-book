import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProject({songId, title, description, image, duration, genre}){
    console.log(songId, title, description, image, duration, genre);

    // this is the link to the LIVE SERVER
    const remote = `${import.meta.env.VITE_APP_API_URL_LOCAL}/songs/${songId}`;
    const local = `http://localhost:5005/songs/${songId}`;

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: title,
        description: description,
        image: image,
        duration: duration,
        genre: genre
    });
     

     const create = (e) => {
        e.preventDefault();

        makePost(formData);
        
        navigate('/profile-keys/'+songId);
    }


    const makePost = async (data) => {
        await axios.put(local, data).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <form onSubmit={create} className="edit-form">
            <label htmlFor="title" className="cp-label">Title</label>
            <input name="title" type="text" value={formData.title} onChange={handleChange} className="cp-input"/>
            <label htmlFor="description" className="cp-label">Description</label>
            <input name="description" type="text" value={formData.description} onChange={handleChange} className="cp-input"/>
            {/* "image": "https://hdqwalls.com/wallpapers/sunset-beach-cp.jpg" */}
            <label htmlFor="image" className="cp-label">Image</label>
            <input name="image" type="text" value={formData.image} onChange={handleChange} className="cp-input"/>
            <label htmlFor="genre" className="cp-label">Genre</label>
            <input name="genre" type="text" value={formData.genre} onChange={handleChange} className="cp-input"/>
            <input type="submit" value="Edit"/>
        </form>
    )
}
export default EditProject