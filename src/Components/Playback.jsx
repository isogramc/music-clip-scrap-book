import { useEffect, useState, useRef } from "react"
import * as Tone from "tone";
import songfile from './../assets/soundfile.svg'
import play from './../assets/play.svg'
import stop from './../assets/stop.svg'

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

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("deleting", playSong.id);
    `TODO: handle delete track `
  }

    return (
    <div style={{display: 'flex', flexDirection: "column", justifyItems: 'center', padding: "5px"}}>
        <h3>{playSong.instructions}</h3>
        <div style={{textAlign:"center"}}><img src={songfile} alt="soundfile" style={{width: '55px'}}/></div>
        <div style={{display: "flex", justifySelf: 'center', alignItems: "center"}}>
            <button style={{borderRadius: "50%", width: "50px", height: '50px', margin:0, padding:0}} ref={playRef}>
                <img style={{width: "50px", height: '50px', marginLeft: "-1px", marginTop: "-1px"}} src={play} alt="play"/>
            </button>
            <button style={{borderRadius: "50%", width: "50px", height: '50px', margin:0, padding:"10px"}} onClick={handleStop}>
                <img style={{width: "40px", height: "40px", marginLeft: "-6px", marginTop: "-6px"}} src={stop} alt="stop"/>
            </button>
            <button style={{borderRadius: "50%", width: "50px", height: '50px', margin:0, padding:"5px"}} onClick={handleStop}>
                <div onClick={handleDelete} style={{color: 'red', borderRadius: "50%", border: "3px solid white",  width: "25px", height: '25px', padding: "4px", lineHeight: 0.8, fontSize: "25px"}}>x</div>
            </button>
        </div>
    </div>
    )
}
export default Playback