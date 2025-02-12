import { useState, useEffect, useRef, createRef, useMemo } from 'react'
import { useNavigate } from "react-router-dom";
import play from './../assets/play.svg'
import * as Tone from "tone";
import axios from 'axios';

function PlaybackKeyboard({ track }){
    console.log("trackstring", JSON.stringify(track));
    const [theTrack, setTheTrack] = useState(track);
    const [keys, setKeys] = useState(Array(24).fill(null));
    // set position of keyboard here - middle C is C4. Lower keyboard by decrementing (limit 0). Increase pitch for higher (limit 9)
    // default for the project is C3
    const [position, setPosition] = useState(3);
    const [lowerRegNotes, setLowerRegNotes] = useState(["C", "D", "E", "F", "G", "A", "B"]);
    const [upperRegNotes, setUpperRegNotes] = useState(["C#", "Eb", "F#", "G#", "Bb"]);
    const [trackNotes, setTrackNotes] = useState(track?.notes);
    const [trackPositions, setTrackPositions] = useState(track?.notesPositions);
    const [duration, setDuration] = useState(0);
    const playRef = useRef(null);
    const [colours, setColours] = useState(["red", "blue", "green", "pink", "yellow", "orange", "purple", "cornflowerblue"]);

    const remote = `${import.meta.env.VITE_APP_API_URL}/tracks`;
    const local = "http://localhost:5005/tracks";

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
    const removeColor = (el) => {
        if(el.classList.contains('tkb-white-key')){
            el.style.backgroundColor = 'white';
        }else{
            el.style.backgroundColor = 'black';
        }  
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

    //uncomment for playaable keyboard: note - it is not recommended to have playing and playable keyboard at once
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
        let theId = track?.id;
        
        if((parseInt(track))>-1){
            theId = track;
            axios.get(`${remote}/${track}`).then(resp => {
                console.log(resp.data);
                setTheTrack(resp.data);
            });
        }

        if(track){
            setTrackNotes(track?.notes);
            setTrackPositions(track?.notesPositions);
            setDuration(track?.duration)
            console.log("working", trackNotes, trackPositions);  
        } else {
            setTrackNotes(theTrack?.notes);
            setTrackPositions(theTrack?.notesPositions);
            setDuration(theTrack?.duration)
            console.log("working", trackNotes, trackPositions);  
        }

        console.log("theTrack", theTrack);
       
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


    //uncomment for playaable keyboard: note - it is not recommended to have playing and playable keyboard at once
    async function playNote(e){
        //console.log(e.target.id, e.target.getAttribute(['data-position']))
        await Tone.loaded().then(() => {
             let note = e.target.id;
             let position = e.target.getAttribute(['data-position']);
             console.log(note+position);
             samplerA.triggerAttackRelease(note+position, 1.2);
         });
    }   

    const playSong = async () =>{
       
        // still testing with loops: example here
        // const loopA = new Tone.Loop((time) => {
        // }, "4n").start(0);
       

         await Tone.loaded().then(() => {

            const now = Tone.now();

            // use the time argument to schedule a callback with Draw
            
            let noteLength = 0;
            let done = false;

            console.log("playsong", track, track?.notes?.length);

            if((parseInt(track))>-1){
                let theId = track;
                axios.get(`${remote}/${track}`).then(resp => {
                    console.log(resp.data);
                    setTheTrack(resp.data);
                    setTrackNotes(theTrack?.notes);
                    setTrackPositions(theTrack?.notesPositions);
                    setDuration(theTrack?.duration)
                });
            }

            if(track?.notes?.length){
                let duration = track?.duration;
                for(let i=0; i<track?.notes.length; i++){

                    console.log(track?.notes[i]);
                     //play a note every quarter-note in succession
                    sampler.triggerAttackRelease(track?.notes[i], "8n", now + noteLength);
                    let time = now + noteLength; // sync drawing with player
                    //Tone.debug();
                    Tone.Draw.schedule(() => {
                        let element = refsById["divRef"+track?.notesPositions[i]].current;
                        if(track?.notesPositions[i-1]!==undefined){
                            let prevElement = refsById["divRef"+track?.notesPositions[i-1]].current;
                            removeColor(prevElement);
                        }
                        if(element){       
                            changeColor(element);
                        }
                        console.log(Math.round(time+0.5), Math.round(now+duration)); 

                        if(Math.round(time+0.5) === Math.round(now+duration)){  
                            done = true;
                            console.log("Song has ended");
                        }

                        if(done){
                            setTimeout(function () {
                                let lastColour = refsById["divRef"+track?.notesPositions[track?.notesPositions?.length-1]].current;
                                console.log(lastColour);
                                removeColor(lastColour);
                            }, 1000);
                        }
                    }, time);
                  
                    noteLength += 0.5;
                   
                }
            }else if(trackNotes?.length>0){
                for(let i=0; i<trackNotes.length; i++){

                    console.log(trackNotes[i]);
                     //play a note every quarter-note in succession
                    sampler.triggerAttackRelease(trackNotes[i], "8n", now + noteLength);
                    let time = now + noteLength; // sync drawing with player
                    //Tone.debug();
                    Tone.Draw.schedule(() => {
                        let element = refsById["divRef"+trackPositions[i]].current;
                        if(trackPositions[i-1]!==undefined){
                            let prevElement = refsById["divRef"+trackPositions[i-1]].current;
                            removeColor(prevElement);
                        }
                        if(element){       
                            changeColor(element);
                        }
                        console.log(Math.round(time+0.5), Math.round(now+duration)); 

                        if(Math.round(time+0.5) === Math.round(now+duration)){  
                            done = true;
                            console.log("Song has ended");
                        }

                        if(done){
                            setTimeout(function () {
                                let lastColour = refsById["divRef"+trackPositions[trackPositions.length-1]].current;
                                console.log(lastColour);
                                removeColor(lastColour);
                            }, 1000);
                        }
                    }, time);
                  
                    noteLength += 0.5;
                   
                }
            }

                
      
            Tone.getTransport().start();
            // tone can also ramp up your bpm e.g. to 800 bpm over 10 seconds
            // Tone.getTransport().bpm.rampTo(800, 10)
        })

    }

    if(!track){
        return <div>...Loading</div>
    }

  if(track){
    return (
        <div className="keys-layout">
            <div className='play-along-text'>
                <h3>Play along on your physical piano while being guided by the recorded track or select a track from your list above for live playback</h3>
            <div>
                <button className="btn-play-playalong" ref={playRef} onClick={(e)=>playSong(e)}><img src={play} alt="play"/></button>
            </div>
            </div>
            <div className="tkb-piano-container" style={{justifySelf: 'center'}}>  
                <div className="piano-keys">
                    {keys.map((key, index) => (
                        <div key={index}
                            ref={refsById["divRef"+index]}
                            id={index>=10 ? (index>=17 ? lowerRegNotes[index-17]: lowerRegNotes[index-10]): (index>=5 ? upperRegNotes[index-5] : upperRegNotes[index])}
                            data-position={index < 17 ? (index>=5&&index<10 ? (position+1) : position) : (position+(Math.floor((index-10)/7)))}
                            className={index < 10 ? "tkb-black-key" : "tkb-white-key"} onClick={(e)=>playNote(e)}>
                        </div>
              ))}
            </div>
            </div>
        </div>
         );
    }
   
}

export default PlaybackKeyboard