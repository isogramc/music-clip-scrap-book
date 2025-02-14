import PlaybackKeyboard from './../components/PlaybackKeyboard'
import EditProject from '../components/EditProject'
import './styles/ProfilePageKeys.css'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useParams, useLocation } from 'react-router'
import SelectableList from '../components/SelectableList'
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import ProjectCardDisplay from '../components/ProjectCardDisplay'

function ProfilePageKeys({setShowLogin}){

  const user = useContext(LoginContext);

  console.log(JSON.stringify(user));

    const [currentUser, setCurrentUser] = useState(user?.id);
    const [song, setSong] = useState({});
    const [tracks, setTracks] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showTracks, setShowTracks] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [updateSelection, setupdateSelection] = useState(0);

    const {songId} = useParams();
    //console.log(songId);

    const navigate = useNavigate();
    
    useEffect(()=>{   
      if(!user.loggedIn){
        navigate("/");
        setShowLogin(true);
      }

      setCurrentUser(user.id);

        getSongFile().then(function (result) {
            setSong(result[0].data);
            setTracks(result[1].data);
            setSelectedTrack(result[1].data[updateSelection]);
        });  
    }, []);


     // this is the link to the LIVE SERVER AND get tracks for song > baseUrl/songId?_embed=tracks
     const remote = `${import.meta.env.VITE_APP_API_URL}/songs/${songId}`;
     const remote2 = `${import.meta.env.VITE_APP_API_URL}/tracks`;
 
     async function getSongFile() {
         //console.log("has embed", paramsx.has("_embed")); // true
         const params = {"songId": songId};
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

       const handleSelected = (track) => {
          console.log("handleSelect", track);
          setSelectedTrack(track);  
       }

    return (
        <div style={{width: '100%'}}>
            <div style={{position: 'absolute', width: '100%', textAlign: "center"}}>{user.fullName}'s Playback and edit page</div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'rgb(7, 77, 120)'}}>
              <ProjectCardDisplay id={song.id} image={song.image} title={song.title} description={song.description} genre={song.genre}/>
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
            <div className='spacer'></div>
        </div>
    )
}

export default ProfilePageKeys