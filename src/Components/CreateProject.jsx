import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProject(props){
    const navigate = useNavigate();
    const { userId } = props;
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        duration: 0,
        genre: ""
    });

     // this is the link to the LIVE SERVER
     const remote = `${import.meta.env.VITE_APP_API_URL_LOCAL}/songs`;
     const local = "http://localhost:5005/songs";

     const create = (e) => {
        e.preventDefault();

        const dataObj = {
            ...formData,
            userId: userId!==undefined?userId:2,
        }

        makePost(dataObj);

        setFormData({
            title: "",
            description: "",
            image: "",
            duration: 0,
            genre: ""
        });
        
        navigate("/profile");
    }


    const makePost = async (data) => {
        await axios.post(local, data).then(function (response) {
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
        <form onSubmit={create} className="create-form">
            <label htmlFor="title" className="cp-label">Title</label>
            <input name="title" type="text" value={formData.title} onChange={handleChange} className="cp-input"/>
            <label htmlFor="description" className="cp-label">Description</label>
            <input name="description" type="text" value={formData.description} onChange={handleChange} className="cp-input"/>
            {/* "image": "https://hdqwalls.com/wallpapers/sunset-beach-cp.jpg" */}
            <label htmlFor="image" className="cp-label">Image</label>
            <input name="image" type="text" value={formData.image} onChange={handleChange} className="cp-input"/>
            <label htmlFor="genre" className="cp-label">Genre</label>
            <input name="genre" type="text" value={formData.genre} onChange={handleChange} className="cp-input"/>
            <input type="submit" value="Create"/>
        </form>
    )
}
export default CreateProject