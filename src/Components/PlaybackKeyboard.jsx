import { useState, useEffect, useRef, createRef, useMemo } from 'react'
import play from './../assets/play.svg'
import * as Tone from "tone";

function PlaybackKeyboard({track}){
    const [keys, setKeys] = useState(Array(24).fill(null));
    const [position, setPosition] = useState(4);
    const [lowerRegNotes, setLowerRegNotes] = useState(["C", "D", "E", "F", "G", "A", "B"]);
    const [upperRegNotes, setUpperRegNotes] = useState(["C#", "Eb", "F#", "G#", "Bb"]);
    const playRef = useRef(null);
    const [colours, setColours] = useState(["red", "blue", "green", "pink", "yellow", "orange", "purple", "cornflowerblue"]);
    const list = ["divRef1", "divRef2", "divRef3", "divRef4", "divRef5", "divRef6", "divRef7", "divRef8", "divRef9", "divRef10", 
        "divRef11", "divRef12", "divRef13", "divRef14", "divRef15", "divRef16", "divRef17", "divRef18", "divRef19", "divRef20",
        "divRef21", "divRef22", "divRef23", "divRef24"];
    const elementsRef = useRef(list.map(() => createRef()));

    const refsById = useMemo(() => {
		const refs = {}
		keys.forEach((item, index) => {
			refs["divRef"+index] = createRef(null)
		})
		return refs
	}, [keys])

    const changeColor = (el) => {
        const random = Math.floor(Math.random() * colours.length);
        el.style.backgroundColor = colours[random];
    }

    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

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

    useEffect(() => {
        const play = playRef.current;

        if (play) {
            play.addEventListener('click', playSong);
        }

        // Cleanup event listener when the component unmounts
        return () => {
            if (play) {
                play.removeEventListener('click', playSong);
            }
        };

    }, []);


     async function playNote(e){
        //console.log(e.target.id, e.target.getAttribute(['data-position']))
        await Tone.loaded().then(() => {
             let note = e.target.id;
             let position = e.target.getAttribute(['data-position']);
             console.log(note+position);
             samplerA.triggerAttackRelease(note+position, 1.2);
         });
    }   

    const playSong = async ()=>{
   
        // still testing with loops: example here
        // const loopA = new Tone.Loop((time) => {
        // }, "4n").start(0);
      
        //await Tone.loaded().then(() => {

            if(track?.notes?.length>0){
                console.log(track.notes);
            }
            const now = Tone.now();
            let noteLength = 0;
            if(track?.notes?.length>0){
                for(let i=0; i<track.notes.length; i++){
                    console.log(track.notes[i]);
                     //play a note every quarter-note in succession
                    sampler.triggerAttackRelease(track.notes[i], "8n", now + noteLength);
                    
                   let indexi = 10+i;
                   console.log(indexi);
                    let element = refsById["divRef"+indexi].current;
                    if(element){       
                        changeColor(element);
                    }
                   
                    noteLength += 0.5;
                }
            }

            Tone.getTransport().start();
           
        //})
        // tone can also ramp up your bpm e.g. to 800 bpm over 10 seconds
        // Tone.getTransport().bpm.rampTo(800, 10);
    }

    return (
        <div>
            <span style={{color: 'black'}}>{track?.notes}</span>
            <div>
                <button style={{borderRadius: "50%", width: "50px", height: '50px', margin:0, padding:0}} ref={playRef}>
                    <img style={{width: "50px", height: '50px', marginLeft: "-1px", marginTop: "-1px"}} src={play} alt="play"/>
                </button>
            </div>
            <h3>Load your track or a found track here and play along on your piano:</h3>
            <div className="tkb-piano-container">  
                <div className="piano-keys">
                    {keys.map((key, index) => (
                        <div key={index}
                            ref={refsById["divRef"+index]}
                            id={index>=10 ? (index>=17 ? lowerRegNotes[index-17]: lowerRegNotes[index-10]): (index>=5 ? upperRegNotes[index-5] : upperRegNotes[index])}
                            data-position={index < 17 ? (index>=5&&index<10 ? (position+1) : position) : (position+(Math.floor((index-10)/7)))}
                            className={index < 10 ? "tkb-black-key" : "tkb-white-key"}
                            onClick={(e) => playNote(e)}>
                        </div>
              ))}
            </div>
            </div>
        </div>
    );
}
export default PlaybackKeyboard