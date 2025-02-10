import PlaybackKeyboard from './../components/PlaybackKeyboard'
import EditProject from '../components/EditProject'
import ProjectCard from './../components/ProjectCard'
import './../App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import SelectableList from '../components/SelectableList'
import { useNavigate } from "react-router-dom";

function ProfilePageKeys(props){
    const [currentUser, setCurrentUser] = useState(props?.user?.userId);
    const [song, setSong] = useState({});
    const [tracks, setTracks] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showTracks, setShowTracks] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [updateSelection, setupdateSelection] = useState(null);
    const {songId} = useParams();
    console.log(songId);

    const navigate = useNavigate();
    
    useEffect(()=>{   
      const userd = localStorage.getItem('tokens');
      const theUser = JSON.parse(userd);
      setCurrentUser(theUser.id);

        getSongFile().then(function (result) {
            console.log(result);
            setSong(result[0].data);
            setTracks(result[1].data)
            console.log('api', result[1].data.notes);
            if(updateSelection!=null){
              setSelectedTrack(result[1].data[updateSelection]);
              console.log(result[1].data[updateSelection]);
            }else{
              setSelectedTrack(result[1].data[0]);
            }  
        });  
    }, []);

     // this is the link to the LIVE SERVER AND get tracks for song > baseUrl/songId?_embed=tracks
     const remote = `${import.meta.env.VITE_APP_API_URL}/songs/${songId}`;
     const local = `http://localhost:5005/songs/${songId}`;
     const remote2 = `${import.meta.env.VITE_APP_API_URL}/tracks`;
     const local2 = "http://localhost:5005/tracks/";
 
     async function getSongFile() {
         //console.log("has embed", paramsx.has("_embed")); // true
         const params = {"songId": songId};
         console.log(params);
         try {
           // change the link depending on the environment 
           const p1 = await axios.get(remote);
           const p2 = await axios.get(remote2, {
            params: params
          });
           return Promise.all([p1, p2])
         } catch (error) {
           console.error(error);
         }
       }

       const handleSelected = (index) => {
          console.log(index);
          setSelectedTrack(index);
          setupdateSelection(index);
       }

    return (
        <div style={{width: '100%'}}>
            <div style={{justifySelf: 'center'}}>
              <ProjectCard id={song.id} image={song.image} title={song.title} description={song.description} />
            </div>
            <h3 style={{justifySelf: 'center'}}>You have recorded {tracks?.length>0?(tracks.length>1?tracks.length:"1 track"):"no tracks"} for {song.title}</h3>
            <div className='menu-group'>
              <button className={"btn-menu"} onClick={e=>setShowEdit(!showEdit)}>{showEdit?"Hide Edit":"Edit Song"}</button>
              <button className={"btn-menu"} onClick={e=>setShowTracks(!showTracks)}>{showTracks?"Hide Tracks":"View Tracks"}</button>
              <button className={"btn-menu"} onClick={e=>navigate('/profile', { state: {currentUser: currentUser}})}>Go Back</button>
            </div>
              {showEdit && <EditProject songId={song.id}  title={song.title} description={song.description} image={song.image} duration={song.duration} genre={song.genre} />}
            <div className={"track-list"}>
              {showTracks && <SelectableList tracks={tracks} handleSelected={handleSelected}/>}   
            </div>
            <PlaybackKeyboard track={selectedTrack}/>
        </div>
    )
}

export default ProfilePageKeys