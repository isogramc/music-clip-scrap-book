import PlaybackKeyboard from './../components/PlaybackKeyboard'
import EditProject from '../components/EditProject'
import ProjectCard from './../components/ProjectCard'
import './../App.css'
import Playback from '../components/Playback'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

function ProfilePageKeys(props){
    const [currentUser, setCurrentUser] = useState(props.user.userId);
    const [song, setSong] = useState({});
    const [tracks, setTracks] = useState([]);
    const {songId} = useParams();
    console.log(songId);
    //const myparams = "_embed=tracks"
    //const paramsx = new URLSearchParams(myparams);
    

    useEffect(()=>{
        getSongFile().then(function (result) {
            console.log(result);
            setSong(result[0].data);
            setTracks(result[1].data)
        });  
    }, []);

     // this is the link to the LIVE SERVER AND get tracks for song > baseUrl/songId?_embed=tracks
     const remote = `${import.meta.env.VITE_APP_API_URL_LOCAL}/songs/${songId}`;
     const local = `http://localhost:5005/songs/${songId}`;
     const local2 = "http://localhost:5005/tracks/";
 
     async function getSongFile() {
         //console.log("has embed", paramsx.has("_embed")); // true
         const params = {"songId": songId};
         try {
           // change the link depending on the environment 
           const p1 = await axios.get(local);
           const p2 = await axios.get(local2, {
            params: params
          });
           return Promise.all([p1, p2])
         } catch (error) {
           console.error(error);
         }
       }

    return (
        <div style={{width: '100%'}}>
            <div style={{justifySelf: 'center'}}>
              <ProjectCard id={song.id} image={song.image} title={song.title} description={song.description} />
            </div>
            {/* <h1>Virtual Piano Edit and Play</h1> */}
            {song?.id && <EditProject songId={song.id}  title={song.title} description={song.description} image={song.image} duration={song.duration} genre={song.genre} />}
            <h3 style={{justifySelf: 'center'}}>You have recorded {song?.tracks?.length} tracks for {song.title}:</h3>
            <div style={{justifySelf: 'center', width:"700px", display: 'flex', flexDirection: "row", overflowX:'scroll', margin: '20px'}}>
              {tracks?.map((track, index)=>
                <div key={index}> {index+1}. <Playback playSong={track}/> </div>
              )}   
            </div>
            <PlaybackKeyboard track={tracks[0]}/>
        </div>
    )
}

export default ProfilePageKeys