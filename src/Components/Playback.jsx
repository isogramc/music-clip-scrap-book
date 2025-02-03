import { useEffect, useState, useRef } from "react"
import * as Tone from "tone";
import songfile from './../assets/soundfile.svg'

function Playback({ playSong }){
   
    const samplerA = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

    const playRef = useRef(null);
    const [song, setSong] = useState([]);

    useEffect(() => {
        if(playSong?.notes?.length>0){
            console.log(playSong);
            setSong(playSong);
        }

        const play = playRef.current;

        if (play) {
            play.addEventListener('click', handleClick);
        }

        // Cleanup event listener when the component unmounts
        return () => {
            if (play) {
                play.removeEventListener('click', handleClick);
            }
        };
    })

    async function handleClick () {
        const now = Tone.now();
        let noteLength = 0;
        console.log(song.notes);
        console.log(song.instructions);
        if(song.notes?.length>0){
            for(let i=0; i<song.notes.length; i++){
                console.log(song.notes[i]);
                 //play a note every quarter-note in succession
                samplerA.triggerAttackRelease(song.notes[i], "8n", now + noteLength);
                noteLength += 0.5;
            }
        }
        // still testing with loops: example here
        // const loopA = new Tone.Loop((time) => {
        // }, "4n").start(0);
      
        await Tone.getTransport().start();
        // tone can also ramp up your bpm e.g. to 800 bpm over 10 seconds
        // Tone.getTransport().bpm.rampTo(800, 10);
  }

  const handleStop = () => {
    Tone.getTransport().stop();
  }

  if(playSong?.notes?.length===0){
    return <div> ...Loading </div>
  }

    return (
    <div>
        <h3>{playSong.instructions}</h3>
        <div className="song-display"><img src={songfile} alt="soundfile" style={{width: '55px'}}/></div>
        <button ref={playRef}>
            Play
        </button>
        <button onClick={handleStop}>
            Stop
        </button>
    </div>
    )
}
export default Playback