import React, { useEffect, useState, useRef } from 'react';
import Soundfont from 'soundfont-player';
import './styles/ProfilePage.css';
import CreateProject from '../components/CreateProject';
import ProjectsList from '../components/ProjectsList';
import ProjectsSelect from '../components/ProjectsSelect';
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
  
  function ProfilePage(props) {
    // this is the link to the LIVE SERVER
    const remote = `${import.meta.env.VITE_APP_API_URL_LOCAL}/tracks`;
    const local = "http://localhost:3000/tracks";

    const [showCreate, setShowCreate] = useState(false);
    const [showRecord, setShowRecord] = useState(false);
    const [player, setPlayer] = useState(null);
    const [audio, setAudio] = useState(false);
    const [track, setTrack] = useState(null);
    const [song, setSong] = useState([]);
    const [currentUser, setCurrentUser] = useState(props.user.userId);
    const [currentUserImage, setCurrentUserImage] = useState(props.user.image);
    const [notesText, setNotesText] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
  
    useEffect(() => {
      Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(instrument => {
        setPlayer(instrument);
      });
    }, []);

    const addNewTrackToProject = async (trackData) => {
      console.log(trackData);
      await axios.post(local, trackData).then(function (response) {
        console.log(response);
        setShowRecord(!showRecord);
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

    const save = () => {
      console.log("track added to -> ", selectedProject);
      let instructions = prompt("Any instructions to add?", "left-hand");
      const track = {
        instructions: instructions,
        notes: notesText,
        songId: selectedProject,
      }
      addNewTrackToProject(track);
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
            <div className="profile-circle"><img src={currentUserImage} alt="user's profile pic" style={{width: '50px', borderRadius: "50%"}}/></div>
            <div className="menu-icon">&#9776;</div>
          </div>
          <div className="logo">Piano App</div>
        </nav>
  
        {/* Main Content */}
        <div className="main-content">
          {/* Left Side: Piano */}
        <div className='contains-proj-list'>
          <ProjectsList params={{userId: currentUser}}/>
        </div>

         User Id: {currentUser}  | Currently Working on project: {selectedProject}

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
              <textarea value={notesText} onChange={onChange} className="recorded-display"></textarea>
              <button onClick={save}>Save</button>
            </div>}
        </div>

        {showCreate && <CreateProject userId={currentUser} /> }
  
        {/* Bottom Player */}
        <div className="bottom-player">
          <button className="create-project" onClick={createProject}>{showCreate?"Return":"New Song"}</button>
          {!selectedProject && <label>Please select a project to work on:</label>}
          <ProjectsSelect selectProject={selectProject} params={{userId: currentUser}}/>
          {selectedProject && (<div>
            <button className="record-button" onClick={handleRecord}>Record</button>
              <div className="playback-controls">
                <button>⏮️</button>
                <button onClick={handlePlay}>▶️</button>
                <button>⏭️</button>
              </div>
            </div>)}
        </div>
      </div>
    );
  }
  
  export default ProfilePage;