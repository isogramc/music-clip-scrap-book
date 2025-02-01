import Keyboard from './../components/Keyboard'
import './../App.css'
import Playback from '../components/Playback'
import { useEffect, useState } from 'react'
import axios from 'axios'

function ProfilePageKeys(){
    const [song, setSong] = useState([]);

    useEffect(()=>{
        getSongFile().then(function (result) {
            console.log(result.data[0]);
            //console.log(result.data[0].notes);
            setSong(result.data[0]);
        });  
    }, []);

     // this is the link to the LIVE SERVER
     const remote = `${import.meta.env.VITE_APP_API_URL_LOCAL}/tracks`;
     const local = "http://localhost:5005/tracks";
 
     async function getSongFile() {
         try {
           // change the link depending on the environment 
           return await axios({url: local, 
             method: 'get',
             timeout: 8000,
             headers: {
                 'Content-Type': 'application/json',
             },
            params: {
                id: 1
            }
           })
         } catch (error) {
           console.error(error);
         }
       }

    return (
        <div>
            <Keyboard />
            <Playback playSong={song}/>
        </div>
    )
}

export default ProfilePageKeys