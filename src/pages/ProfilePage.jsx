import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import Soundfont from 'soundfont-player';
import './styles/ProfilePage.css';
import CreateProject from '../components/CreateProject';
import ProjectsList from '../components/ProjectsList';
import ProjectsSelect from '../components/ProjectsSelect';
import Profile from '../components/Profile';
import Playback from '../components/Playback';
import axios from 'axios';

const notes = [
    { note: 'C3', isBlack: false }, { note: 'C#3', isBlack: true }, { note: 'D3', isBlack: false },
    { note: 'D#3', isBlack: true }, { note: 'E3', isBlack: false }, { note: 'F3', isBlack: false },
    { note: 'F#3', isBlack: true }, { note: 'G3', isBlack: false }, { note: 'G#3', isBlack: true },
    { note: 'A3', isBlack: false }, { note: 'A#3', isBlack: true }, { note: 'B3', isBlack: false },
    { note: 'C4', isBlack: false }, { note: 'C#4', isBlack: true }, { note: 'D4', isBlack: false },
    { note: 'D#4', isBlack: true }, { note: 'E4', isBlack: false }, { note: 'F4', isBlack: false },
    { note: 'F#4', isBlack: true }, { note: 'G4', isBlack: false }, { note: 'G#4', isBlack: true },
    { note: 'A4', isBlack: false }, { note: 'A#4', isBlack: true }, { note: 'B4', isBlack: false }
  ];
  const arr=[];
  
  function ProfilePage({ userId, image, fullName }) {
    // this is the link to the LIVE SERVER
    let location = useLocation();
    let locationParams = location.state.queryParams;
    const remoteUsers = `${import.meta.env.VITE_APP_API_URL}/users`;
    const localUsers = "http://localhost:5005/users";
    const remoteTracks = `${import.meta.env.VITE_APP_API_URL}/tracks`;
    const localTracks = "http://localhost:5005/tracks";
    const [showCreate, setShowCreate] = useState(false);
    const [showRecord, setShowRecord] = useState(false);
    const [player, setPlayer] = useState(null);
    const [audio, setAudio] = useState(false);
    const [track, setTrack] = useState(null);
    const [song, setSong] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserImage, setCurrentUserImage] = useState('');
    const [notesText, setNotesText] = useState("");
    const [notesPositions, setNotesPositions] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [showPlayback, setShowPlayback] = useState(false);
    const [myInstructions, setMyInstructions] = useState("");

    useEffect(() => {
      if (!userId) {
        if(locationParams){
          setCurrentUser(locationParams);
        }
        console.error('userId is not defined');
        return;
      }
  
      // Fetch user from backend API using userId prop
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${remoteUsers}/${userId}`);
          console.log('User data:', response.data); // Debug log
          setCurrentUser(response.data);
          setCurrentUserImage(response.data.image);
          console.log('User image URL:', response.data.image); // Debug log
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUser();
    }, [userId]);

  
    useEffect(() => {
      Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(instrument => {
        setPlayer(instrument);
      });
    }, []);

    const addNewTrackToProject = async (trackData) => {
      console.log(trackData);
      await axios.post(remoteTracks, trackData).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }
  
    const playNote = (note) => {
      if (player) {
        player.play(note);
        if(showRecord){
          setNotesText([
            ...notesText, 
            note
          ]);
          getPositionForPlayback(note);
        }
      }
    };

    const onChange = (e) => {
      console.log("change", e.target.value);
    }

    const handleRecord = () => {
      setShowRecord(!showRecord);
    }

    const handlePlay = () => {
      setAudio(!audio);
    }
    const createProject = () => {
      setShowCreate(!showCreate);
    }
    
    function getPositionForPlayback(note){
      // this depends on the keyboard the user uses to playback songs
      // this has to remain dynamic because of mobile view
      // for the demo we use C3
      console.log(note);
      const position = 3; 
      let index, notePos = note.charAt(note.length-1);
      const useMobileLayout = ["C#"+position, "Eb"+position, "F#"+position, "G#"+position, "Bb"+position,"C#"+(position+1), "Eb"+(position+1), "F#"+(position+1), "G#"+(position+1), "Bb"+(position+1),"C"+position, "D"+position, "E"+position, "F"+position, "G"+position, "A"+position, "B"+position, "C"+(position+1), "D"+(position+1), "E"+(position+1), "F"+(position+1), "G"+(position+1), "A"+(position+1), "B"+(position+1)]
      //for (let i=0; i<tune.length; i++){
        let replace = "";
        if(note.includes("D#")){ replace = "Eb"+notePos};
        if(note.includes("A#")){ replace = "Bb"+notePos};
        console.log(replace);

        if(replace.length>0){
          for (let i = 0; i < useMobileLayout.length; i++) {
             const element = useMobileLayout[i];
            if(element == replace){
              index = i;
              arr.push(index);
            }  
          }
        }else{
          for (let i = 0; i < useMobileLayout.length; i++) {
            const element = useMobileLayout[i];
           if(element == note){
             index = i;
             arr.push(index);
           }  
         }
        }

      console.log(arr);
      setNotesPositions(arr);
    }

    const save = () => {
      console.log("track added to -> ", selectedProject);
      let durationA = notesText.length * 0.5;
      let instructions = prompt("Any instructions to add?", "left-hand");
      setMyInstructions(instructions);
        const track = {
          instructions: instructions,
          notes: notesText,
          songId: selectedProject,
          notesPositions: notesPositions,
          duration: durationA
        }
        console.log(track, notesPositions);
      if(notesPositions.length===notesText.length){
        setTrack(track);
        addNewTrackToProject(track);
        setShowRecord(false);
        setShowPlayback(true);
      }
    }

    const selectProject = (id) => {
      console.log(id);
      setSelectedProject(id)
    }
  
    return (
      <div className="profile-page">
        {/* Top Navigation Bar */}
        
        <nav className="top-nav">
        <div className="profile-section">
          <div className="profile-circle">
            <img
              src={image}
              alt="User's profile"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'default-image-url'; // Default image on error
              }}
            />
          </div>
        </div>

        {/* Center: Logo */}
        <div className="logo"></div>

        {/* Right: Welcome message */}
        <div className="welcome-message">
          <p>Welcome {fullName}</p>
        </div>
      </nav>
  
        {/* Main Content */}
        <div className="main-content">
          {/* Left Side: Piano */}
          <div>Welcome to your workspace! Play on the piano or record a track</div>
        <div className='contains-proj-list'>
          <div>Existing Projects: Click on a song in the list to go into edit and playback mode</div>
          <ProjectsList params={{userId: currentUser}}/>
        </div>

         {showRecord && <div>{fullName} is currently Recording </div>}

          <div className="piano-container">
            <h2>Virtual Piano</h2>
            <div className="piano-keys">
              {notes.map((key, index) => (
                <div
                  key={index}
                  className={key.isBlack ? 'black-key' : 'white-key'}
                  onClick={() => playNote(key.note)}
                >
                  {key.isBlack ? '' : key.note}
                </div>
              ))}
            </div>
          
          </div>
            {/* Right Side: Recorded Section */}
           {showRecord && <div className="recorded-section">
              <h3>Recorded Melody</h3>
              <textarea style={{maxHeight: '120px'}} value={notesText} onChange={onChange} className="recorded-display"></textarea>
              <button onClick={save}>Save</button>
            </div>}
        </div>

        {showCreate && <CreateProject userId={currentUser} /> }
  
        {/* Bottom Player */}
        <div className="bottom-player">
          <button className="create-project" style={{width: '130px'}} onClick={createProject}>{showCreate?"Return":"Create New"}</button>
          {!selectedProject && <label>Start a recording for your song</label>}
          <ProjectsSelect selectProject={selectProject} params={{userId: currentUser}}/>
          {selectedProject && (<div>
            <button className="record-button" onClick={handleRecord}>Record</button>
              <div className="playback-controls">
                {showPlayback && <Playback playSong={track}/> }
              </div>
            </div>)}
        </div>
      </div>
    );
  }
  
  export default ProfilePage;