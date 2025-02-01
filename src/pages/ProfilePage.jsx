import React, { useEffect, useState } from 'react';
import Soundfont from 'soundfont-player';
import './styles/ProfilePage.css';
import Keyboard from './../components/Keyboard'

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
  
  function ProfilePage() {
    const songArr = [];
    const [player, setPlayer] = useState(null);
    const [audio, setAudio] = useState(false);
    const [track, setTrack] = useState(null);
    const [song, setSong] = useState([ { time: 0, note: "F4"}, { time: 0.5, note: "G4"}, { time: 1, note: "G4"}, { time: 1.5, note: "F4"} ]);
  
    useEffect(() => {
      Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(instrument => {
        setPlayer(instrument);
      });
    }, []);

    useEffect(() => {
      var ac = new AudioContext();
      let time = ac.currentTime;
      if(audio){
        Soundfont.instrument(ac, 'acoustic_grand_piano').then(instrument => {
          setTrack(instrument);

          //track.schedule(ac.currentTime+5, [ { time: 0, note: "F4"}, { time: 0.5, note: "G4"}, { time: 1, note: "G4"}, { time: 1.5, note: "F4"} ]);

          track.play('C4', ac.currentTime, { duration: 0.5})
      
        
        });

       
      }
    })
  
    const playNote = (note) => {
      if (player) {
        songArr.push(note);
        player.play(note);
      }
    };

    const handleRecord = () => {
      setSong(songArr);
    }

    const handlePlay = () => {
      setAudio(!audio);
    }
  
    return (
      <div className="profile-page">
        {/* Top Navigation Bar */}
        <nav className="top-nav">
          <div className="profile-section">
            <div className="profile-circle"></div>
            <div className="menu-icon">&#9776;</div>
          </div>
          <div className="logo">Piano App</div>
        </nav>
  
        {/* Main Content */}
        <div className="main-content">
          {/* Left Side: Piano */}

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
          <div className="recorded-section">
            <h3>Recorded Melody</h3>
            <div className="recorded-display" placeholder="Recorded notes will appear here">{song.toString()}</div>
          </div>
        </div>
  
        {/* Bottom Player */}
        <div className="bottom-player">
          <button className="record-button" onClick={handleRecord}>Record</button>
          <div className="playback-controls">
            <button>⏮️</button>
            <button onClick={handlePlay}>▶️</button>
            <button>⏭️</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProfilePage;