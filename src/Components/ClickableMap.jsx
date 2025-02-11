import React, { useState, useEffect, useRef, createRef, useMemo } from 'react'
import * as Tone from "tone";
import * as Midi from '@tonejs/midi';
import play from './../assets/play.svg'
import audio1 from './../assets/audio/groove-funk-1/groove-funk-1-80.m4a'

function ClickableMapSvg({ track }) {

  const playRef = useRef(null);
  var audio = new Audio(audio1);
  const [colours, setColours] = useState(["red", "blue", "green", "pink", "yellow", "orange", "purple", "cornflowerblue"]);
  const [color, setColor] = useState('blue');

  const changeColor = (el) => {
    const random = Math.floor(Math.random() * colours.length);
    el.style.backgroundColor = colours[random];
}

// const sampler = new Tone.Sampler({
//     urls: {
//         "C4": "C4.mp3",
//         "D#4": "Ds4.mp3",
//         "F#4": "Fs4.mp3",
//         "A4": "A4.mp3",
//     },
//     release: 1,
//     baseUrl: "https://tonejs.github.io/audio/salamander/",
// }).toDestination();

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


 async function playNote(e, note){
    console.log(e.target);
    await Tone.loaded().then(() => {
         sampler.triggerAttackRelease(note, 1.2);
     });
}   

const playSong = async () => {

    // still testing with loops: example here
    // const loopA = new Tone.Loop((time) => {
    // }, "4n").start(0);

  
    await Tone.loaded().then(() => {

      
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
                
              //  let indexi = 10+i;
              //  console.log(indexi);
              //   let element = refsById["divRef"+indexi].current;
              //   if(element){       
              //       changeColor(element);
              //   }
               
                noteLength += 0.5;
            }
        }

        Tone.getTransport().start();
       
    })
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
      <svg
        class="piano-keys"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1197.8 140.7"
      >
        <defs>
          <linearGradient id="GradientBlack" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#494949" />
            <stop offset="70%" stop-color="#222" stop-opacity="1" />
            <stop offset="100%" stop-color="#000" />
          </linearGradient>
          <linearGradient id="GradientWhite" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#dfdfdf" />
            <stop offset="50%" stop-color="#f2f2f2" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" />
          </linearGradient>
        </defs>
        <rect rx="1.5" y="20" x="0.5" class="note note-white keyA0" onClick={(e) => playNote(e, "A0")} />
        <rect rx="1.5" y="20" x="23.5" class="note note-white keyB0" onClick={(e) => playNote("B0")} />
        <rect rx="1.5" y="20" x="20.2" class="note note-black keyA#0" onClick={(e) => playNote("A#0")}/>
        <rect rx="1.5" y="20" x="46.5" class="note note-white keyC1" onClick={(e) => playNote("C1")}/>
        <rect rx="1.5" y="20" x="69.5" class="note note-white keyD1" onClick={(e) => playNote("D1")}/>
        <rect rx="1.5" y="20" x="92.5" class="note note-white keyE1" onClick={(e) => playNote("E1")}/>
        <rect rx="1.5" y="20" x="115.5" class="note note-white keyF1" onClick={(e) => playNote("F1")}/>
        <rect rx="1.5" y="20" x="138.5" class="note note-white keyG1" onClick={(e) => playNote("G1")}/>
        <rect rx="1.5" y="20" x="161.5" class="note note-white keyA1" onClick={(e) => playNote("A1")}/>
        <rect rx="1.5" y="20" x="184.5" class="note note-white keyB1" onClick={(e) => playNote("B1")}/>
        <rect rx="1.5" y="20" x="60.8" class="note note-black keyC#1" onClick={(e) => playNote("C#1")}/>
        <rect rx="1.5" y="20" x="88.2" class="note note-black keyD#1" onClick={(e) => playNote("D#1")}/>
        <rect rx="1.5" y="20" x="128.8" class="note note-black keyF#1" onClick={(e) => playNote("F#1")}/>
        <rect rx="1.5" y="20" x="154.8" class="note note-black keyG#1" onClick={(e) => playNote("G#1")}/>
        <rect rx="1.5" y="20" x="181.2" class="note note-black keyA#1" onClick={(e) => playNote("A#1")}/>
        <rect rx="1.5" y="20" x="207.5" class="note note-white keyC2" onClick={(e) => playNote("C1")}/>
        <rect rx="1.5" y="20" x="230.5" class="note note-white keyD2" onClick={(e) => playNote("D2")}/>
        <rect rx="1.5" y="20" x="253.5" class="note note-white keyE2" onClick={(e) => playNote("E2")}/>
        <rect rx="1.5" y="20" x="276.5" class="note note-white keyF2" onClick={(e) => playNote("F2")}/>
        <rect rx="1.5" y="20" x="299.5" class="note note-white keyG2" onClick={(e) => playNote("G2")}/>
        <rect rx="1.5" y="20" x="322.5" class="note note-white keyA2" onClick={(e) => playNote("A2")}/>
        <rect rx="1.5" y="20" x="345.5" class="note note-white keyB2" onClick={(e) => playNote("B2")}/>
        <rect rx="1.5" y="20" x="221.8" class="note note-black keyC#2" onClick={(e) => playNote("C#2")}/>
        <rect rx="1.5" y="20" x="249.2" class="note note-black keyD#2" onClick={(e) => playNote("D#2")}/>
        <rect rx="1.5" y="20" x="289.8" class="note note-black keyF#2" onClick={(e) => playNote("F#2")}/>
        <rect rx="1.5" y="20" x="315.8" class="note note-black keyG#2" onClick={(e) => playNote("G#2")}/>
        <rect rx="1.5" y="20" x="342.2" class="note note-black keyA#2" onClick={(e) => playNote("A#2")}/>
        <rect rx="1.5" y="20" x="368.5" class="note note-white keyC3" onClick={(e) => playNote("C3")}/>
        <rect rx="1.5" y="20" x="391.5" class="note note-white keyD3" onClick={(e) => playNote("D3")}/>
        <rect rx="1.5" y="20" x="414.5" class="note note-white keyE3" onClick={(e) => playNote("E3")}/>
        <rect rx="1.5" y="20" x="437.5" class="note note-white keyF3" onClick={(e) => playNote("F3")}/>
        <rect rx="1.5" y="20" x="460.5" class="note note-white keyG3" onClick={(e) => playNote("G3")}/>
        <rect rx="1.5" y="20" x="483.5" class="note note-white keyA3" onClick={(e) => playNote("A3")}/>
        <rect rx="1.5" y="20" x="506.5" class="note note-white keyB3" onClick={(e) => playNote("B3")}/>
        <rect rx="1.5" y="20" x="382.8" class="note note-black keyC#3" onClick={(e) => playNote("C#3")}/>
        <rect rx="1.5" y="20" x="410.2" class="note note-black keyD#3" onClick={(e) => playNote("D#3")}/>
        <rect rx="1.5" y="20" x="450.8" class="note note-black keyF#3" onClick={(e) => playNote("F#3")}/>
        <rect rx="1.5" y="20" x="476.8" class="note note-black keyG#3" onClick={(e) => playNote("G#3")}/>
        <rect rx="1.5" y="20" x="503.2" class="note note-black keyA#3" onClick={(e) => playNote("A#3")}/>
        <rect rx="1.5" y="20" x="529.5" class="note note-white keyC4" onClick={(e) => playNote("C4")}/>
        <rect rx="1.5" y="20" x="552.5" class="note note-white keyD4" onClick={(e) => playNote("D4")}/>
        <rect rx="1.5" y="20" x="575.5" class="note note-white keyE4" onClick={(e) => playNote("E4")}/>
        <rect rx="1.5" y="20" x="598.5" class="note note-white keyF4" onClick={(e) => playNote("F4")}/>
        <rect rx="1.5" y="20" x="621.5" class="note note-white keyG4" onClick={(e) => playNote("G4")}/>
        <rect rx="1.5" y="20" x="644.5" class="note note-white keyA4" onClick={(e) => playNote("A4")}/>
        <rect rx="1.5" y="20" x="667.5" class="note note-white keyB4" onClick={(e) => playNote("B4")}/>
        <rect rx="1.5" y="20" x="543.8" class="note note-black keyC#4" onClick={(e) => playNote("C#4")}/>
        <rect rx="1.5" y="20" x="571.2" class="note note-black keyD#4" onClick={(e) => playNote("D#4")}/>
        <rect rx="1.5" y="20" x="611.8" class="note note-black keyF#4" onClick={(e) => playNote("F#4")}/>
        <rect rx="1.5" y="20" x="637.8" class="note note-black keyG#4" onClick={(e) => playNote("G#4")}/>
        <rect rx="1.5" y="20" x="664.2" class="note note-black keyA#4" onClick={(e) => playNote("A#4")}/>
        <rect rx="1.5" y="20" x="690.52" class="note note-white keyC5" onClick={(e) => playNote("C5")}/>
        <rect rx="1.5" y="20" x="713.52" class="note note-white keyD5" onClick={(e) => playNote("D5")}/>
        <rect rx="1.5" y="20" x="736.52" class="note note-white keyE5" onClick={(e) => playNote("E5")}/>
        <rect rx="1.5" y="20" x="759.52" class="note note-white keyF5" onClick={(e) => playNote("F5")}/>
        <rect rx="1.5" y="20" x="782.52" class="note note-white keyG5" onClick={(e) => playNote("G5")}/>
        <rect rx="1.5" y="20" x="805.52" class="note note-white keyA5" onClick={(e) => playNote("A5")}/>
        <rect rx="1.5" y="20" x="828.52" class="note note-white keyB5" onClick={(e) => playNote("B5")}/>
        <rect rx="1.5" y="20" x="704.82" class="note note-black keyC#5" onClick={(e) => playNote("C#5")}/>
        <rect rx="1.5" y="20" x="732.12" class="note note-black keyD#5" onClick={(e) => playNote("D#5")}/>
        <rect rx="1.5" y="20" x="772.72" class="note note-black keyF#5" onClick={(e) => playNote("F#5")}/>
        <rect rx="1.5" y="20" x="798.72" class="note note-black keyG#5" onClick={(e) => playNote("G#5")}/>
        <rect rx="1.5" y="20" x="825.22" class="note note-black keyA#5" onClick={(e) => playNote("A#5")}/>
        <rect rx="1.5" y="20" x="851.52" class="note note-white keyC6" onClick={(e) => playNote("C6")}/>
        <rect rx="1.5" y="20" x="874.52" class="note note-white keyD6" onClick={(e) => playNote("D6")}/>
        <rect rx="1.5" y="20" x="897.52" class="note note-white keyE6" onClick={(e) => playNote("E6")}/>
        <rect rx="1.5" y="20" x="920.52" class="note note-white keyF6" onClick={(e) => playNote("F6")}/>
        <rect rx="1.5" y="20" x="943.52" class="note note-white keyG6" onClick={(e) => playNote("G6")}/>
        <rect rx="1.5" y="20" x="966.52" class="note note-white keyA6" onClick={(e) => playNote("A6")}/>
        <rect rx="1.5" y="20" x="989.52" class="note note-white keyB6" onClick={(e) => playNote("B6")}/>
        <rect rx="1.5" y="20" x="865.82" class="note note-black keyC#6" onClick={(e) => playNote("C#6")}/>
        <rect rx="1.5" y="20" x="893.12" class="note note-black keyD#6" onClick={(e) => playNote("D#6")}/>
        <rect rx="1.5" y="20" x="933.72" class="note note-black keyF#6" onClick={(e) => playNote("F#6")}/>
        <rect rx="1.5" y="20" x="959.72" class="note note-black keyG#6" onClick={(e) => playNote("G#6")}/>
        <rect rx="1.5" y="20" x="986.22" class="note note-black keyA#6" onClick={(e) => playNote("A#6")}/>
        <rect rx="1.5" y="20" x="1012.52" class="note note-white keyC7" onClick={(e) => playNote("C7")}/>
        <rect rx="1.5" y="20" x="1035.52" class="note note-white keyD7" onClick={(e) => playNote("D7")}/>
        <rect rx="1.5" y="20" x="1058.52" class="note note-white keyE7" onClick={(e) => playNote("E7")}/>
        <rect rx="1.5" y="20" x="1081.52" class="note note-white keyF7" onClick={(e) => playNote("F7")}/>
        <rect rx="1.5" y="20" x="1104.52" class="note note-white keyG7" onClick={(e) => playNote("G7")}/>
        <rect rx="1.5" y="20" x="1127.52" class="note note-white keyA7" onClick={(e) => playNote("A7")}/>
        <rect rx="1.5" y="20" x="1150.52" class="note note-white keyB7" onClick={(e) => playNote("B7")}/>
        <rect rx="1.5" y="20" x="1026.82" class="note note-black keyC#7" onClick={(e) => playNote("C#7")}/>
        <rect rx="1.5" y="20" x="1054.12" class="note note-black keyD#7" onClick={(e) => playNote("D#7")}/>
        <rect rx="1.5" y="20" x="1094.72" class="note note-black keyF#7" onClick={(e) => playNote("F#7")}/>
        <rect rx="1.5" y="20" x="1120.72" class="note note-black keyG#7" onClick={(e) => playNote("G#7")}/>
        <rect rx="1.5" y="20" x="1147.22" class="note note-black keyA#7" onClick={(e) => playNote("A#7")}/>
        <rect rx="1.5" y="20" x="1173.52" class="note note-white keyC8" onClick={(e) => playNote("C8")}/>
        <circle r="5.7" class="middle-c" cx="541.1" cy="125"></circle>
        <circle cx="13.6" cy="9" r="5.7" class="note indicator keyA0" onClick={(e) => playNote("A0")}/>
        <circle cx="26.7" cy="9" r="5.7" class="note indicator keyA#0" onClick={(e) => playNote("A#0")}/>
        <circle cx="39.8" cy="9" r="5.7" class="note indicator keyB0" onClick={(e) => playNote("B0")}/>
        <circle cx="53.4" cy="9" r="5.7" class="note indicator keyC1" onClick={(e) => playNote("C1")}/>
        <circle cx="67" cy="9" r="5.7" class="note indicator keyC#1" onClick={(e) => playNote("C#1")}/>
        <circle cx="80.7" cy="9" r="5.7" class="note indicator keyD1" onClick={(e) => playNote("D1")}/>
        <circle cx="94.4" cy="9" r="5.7" class="note indicator keyD#1" onClick={(e) => playNote("D#1")}/>
        <circle cx="108.1" cy="9" r="5.7" class="note indicator keyE1" onClick={(e) => playNote("E1")}/>
        <circle cx="121.9" cy="9" r="5.7" class="note indicator keyF1" onClick={(e) => playNote("F1")}/>
        <circle cx="135" cy="9" r="5.7" class="note indicator keyF#1" onClick={(e) => playNote("F#1")}/>
        <circle cx="148" cy="9" r="5.7" class="note indicator keyG1" onClick={(e) => playNote("G1")}/>
        <circle cx="161.1" cy="9" r="5.7" class="note indicator keyG#1" onClick={(e) => playNote("G#1")}/>
        <circle cx="174.5" cy="9" r="5.7" class="note indicator keyA1" onClick={(e) => playNote("A1")}/>
        <circle cx="187.7" cy="9" r="5.7" class="note indicator keyA#1" onClick={(e) => playNote("A#1")}/>
        <circle cx="200.9" cy="9" r="5.7" class="note indicator keyB1" onClick={(e) => playNote("B1")}/>
        <circle cx="214.6" cy="9" r="5.7" class="note indicator keyC2" onClick={(e) => playNote("C2")}/>
        <circle cx="228.3" cy="9" r="5.7" class="note indicator keyC#2" onClick={(e) => playNote("C#2")}/>
        <circle cx="242" cy="9" r="5.7" class="note indicator keyD2" />
        <circle cx="255.6" cy="9" r="5.7" class="note indicator keyD#2" onClick={(e) => playNote("D#2")}/>
        <circle cx="269.4" cy="9" r="5.7" class="note indicator keyE2" onClick={(e) => playNote("E2")}/>
        <circle cx="283.1" cy="9" r="5.7" class="note indicator keyF2" onClick={(e) => playNote("F2")}/>
        <circle cx="296.3" cy="9" r="5.7" class="note indicator keyF#2" onClick={(e) => playNote("F#2")}/>
        <circle cx="309.3" cy="9" r="5.7" class="note indicator keyG2" onClick={(e) => playNote("G2")}/>
        <circle cx="322.4" cy="9" r="5.7" class="note indicator keyG#2" onClick={(e) => playNote("G#2")}/>
        <circle cx="335.5" cy="9" r="5.7" class="note indicator keyA2" onClick={(e) => playNote("A2")}/>
        <circle cx="348.7" cy="9" r="5.7" class="note indicator keyA#2" onClick={(e) => playNote("A#2")}/>
        <circle cx="361.9" cy="9" r="5.7" class="note indicator keyB2" onClick={(e) => playNote("B2")}/>
        <circle cx="375.4" cy="9" r="5.7" class="note indicator keyC3" onClick={(e) => playNote("C3")}/>
        <circle cx="389" cy="9" r="5.7" class="note indicator keyC#3" onClick={(e) => playNote("C#3")}/>
        <circle cx="402.8" cy="9" r="5.7" class="note indicator keyD3" onClick={(e) => playNote("D3")}/>
        <circle cx="416.4" cy="9" r="5.7" class="note indicator keyD#3" onClick={(e) => playNote("D#3")}/>
        <circle cx="430.1" cy="9" r="5.7" class="note indicator keyE3" onClick={(e) => playNote("E3")}/>
        <circle cx="443.9" cy="9" r="5.7" class="note indicator keyF3" onClick={(e) => playNote("F3")}/>
        <circle cx="457" cy="9" r="5.7" class="note indicator keyF#3" onClick={(e) => playNote("F#3")}/>
        <circle cx="470" cy="9" r="5.7" class="note indicator keyG3" onClick={(e) => playNote("G3")}/>
        <circle cx="483.1" cy="9" r="5.7" class="note indicator keyG#3" onClick={(e) => playNote("G#3")}/>
        <circle cx="496.2" cy="9" r="5.7" class="note indicator keyA3" onClick={(e) => playNote("A3")}/>
        <circle cx="509.5" cy="9" r="5.7" class="note indicator keyA#3" onClick={(e) => playNote("A#3")}/>
        <circle cx="522.6" cy="9" r="5.7" class="note indicator keyB3" onClick={(e) => playNote("B3")}/>
        <circle cx="536.5" cy="9" r="5.7" class="note indicator keyC4" onClick={(e) => playNote("C4")}/>
        <circle cx="550.2" cy="9" r="5.7" class="note indicator keyC#4" onClick={(e) => playNote("C#4")}/>
        <circle cx="563.9" cy="9" r="5.7" class="note indicator keyD4" onClick={(e) => playNote("D4")}/>
        <circle cx="577.5" cy="9" r="5.7" class="note indicator keyD#4" onClick={(e) => playNote("D#4")}/>
        <circle cx="591.2" cy="9" r="5.7" class="note indicator keyE4" onClick={(e) => playNote("E4")}/>
        <circle cx="605" cy="9" r="5.7" class="note indicator keyF4" onClick={(e) => playNote("F4")}/>
        <circle cx="618.2" cy="9" r="5.7" class="note indicator keyF#4" onClick={(e) => playNote("F#4")}/>
        <circle cx="631.2" cy="9" r="5.7" class="note indicator keyG4" onClick={(e) => playNote("G4")}/>
        <circle cx="644.3" cy="9" r="5.7" class="note indicator keyG#4" onClick={(e) => playNote("G#4")}/>
        <circle cx="657.4" cy="9" r="5.7" class="note indicator keyA4" onClick={(e) => playNote("A4")}/>
        <circle cx="670.6" cy="9" r="5.7" class="note indicator keyA#4" onClick={(e) => playNote("A#4")}/>
        <circle cx="683.7" cy="9" r="5.7" class="note indicator keyB4" onClick={(e) => playNote("B4")}/>
        <circle cx="697.3" cy="9" r="5.7" class="note indicator keyC5" onClick={(e) => playNote("C5")}/>
        <circle cx="710.9" cy="9" r="5.7" class="note indicator keyC#5" onClick={(e) => playNote("C#5")}/>
        <circle cx="724.6" cy="9" r="5.7" class="note indicator keyD5" onClick={(e) => playNote("D5")}/>
        <circle cx="738.3" cy="9" r="5.7" class="note indicator keyD#5" onClick={(e) => playNote("D#5")}/>
        <circle cx="752" cy="9" r="5.7" class="note indicator keyE5" onClick={(e) => playNote("E5")}/>
        <circle cx="765.8" cy="9" r="5.7" class="note indicator keyF5" onClick={(e) => playNote("F5")}/>
        <circle cx="778.9" cy="9" r="5.7" class="note indicator keyF#5" onClick={(e) => playNote("F#5")}/>
        <circle cx="791.9" cy="9" r="5.7" class="note indicator keyG5" onClick={(e) => playNote("G5")}/>
        <circle cx="805" cy="9" r="5.7" class="note indicator keyG#5" onClick={(e) => playNote("G#5")}/>
        <circle cx="818.1" cy="9" r="5.7" class="note indicator keyA5" onClick={(e) => playNote("A5")}/>
        <circle cx="831.3" cy="9" r="5.7" class="note indicator keyA#5" onClick={(e) => playNote("A#5")}/>
        <circle cx="844.5" cy="9" r="5.7" class="note indicator keyB5" onClick={(e) => playNote("B5")}/>
        <circle cx="858.5" cy="9" r="5.7" class="note indicator keyC6" onClick={(e) => playNote("C6")}/>
        <circle cx="872.2" cy="9" r="5.7" class="note indicator keyC#6" onClick={(e) => playNote("C#6")}/>
        <circle cx="885.9" cy="9" r="5.7" class="note indicator keyD6" onClick={(e) => playNote("D6")}/>
        <circle cx="899.5" cy="9" r="5.7" class="note indicator keyD#6" onClick={(e) => playNote("D#6")}/>
        <circle cx="913.2" cy="9" r="5.7" class="note indicator keyE6" onClick={(e) => playNote("E6")}/>
        <circle cx="927" cy="9" r="5.7" class="note indicator keyF6" onClick={(e) => playNote("F6")}/>
        <circle cx="940.2" cy="9" r="5.7" class="note indicator keyF#6" onClick={(e) => playNote("F#6")}/>
        <circle cx="953.2" cy="9" r="5.7" class="note indicator keyG6" onClick={(e) => playNote("G6")}/>
        <circle cx="966.3" cy="9" r="5.7" class="note indicator keyG#6" onClick={(e) => playNote("G#6")}/>
        <circle cx="979.4" cy="9" r="5.7" class="note indicator keyA6" onClick={(e) => playNote("A6")}/>
        <circle cx="992.6" cy="9" r="5.7" class="note indicator keyA#6" onClick={(e) => playNote("A#6")}/>
        <circle cx="1005.7" cy="9" r="5.7" class="note indicator keyB6" onClick={(e) => playNote("B6")}/>
        <circle cx="1019.3" cy="9" r="5.7" class="note indicator keyC7" onClick={(e) => playNote("C7")}/>
        <circle cx="1032.9" cy="9" r="5.7" class="note indicator keyC#7" onClick={(e) => playNote("C#7")}/>
        <circle cx="1046.6" cy="9" r="5.7" class="note indicator keyD7" onClick={(e) => playNote("D7")}/>
        <circle cx="1060.3" cy="9" r="5.7" class="note indicator keyD#7" onClick={(e) => playNote("D#7")}/>
        <circle cx="1074" cy="9" r="5.7" class="note indicator keyE7" onClick={(e) => playNote("E7")}/>
        <circle cx="1087.8" cy="9" r="5.7" class="note indicator keyF7" onClick={(e) => playNote("F7")}/>
        <circle cx="1100.9" cy="9" r="5.7" class="note indicator keyF#7" onClick={(e) => playNote("F#7")}/>
        <circle cx="1113.9" cy="9" r="5.7" class="note indicator keyG7" onClick={(e) => playNote("G7")}/>
        <circle cx="1127" cy="9" r="5.7" class="note indicator keyG#7" onClick={(e) => playNote("G#7")}/>
        <circle cx="1140.1" cy="9" r="5.7" class="note indicator keyA7" onClick={(e) => playNote("A7")}/>
        <circle cx="1153.3" cy="9" r="5.7" class="note indicator keyA#7" onClick={(e) => playNote("A#7")}/>
        <circle cx="1166.5" cy="9" r="5.7" class="note indicator keyB7" onClick={(e) => playNote("B7")}/>
        <circle cx="1180.5" cy="9" r="5.7" class="note indicator keyC8" onClick={(e) => playNote("C9")}/>
        <line class="top-line" x2="1197" x1="0" y2="20" y1="20" />
      </svg>
    </div>
  );
}
export default ClickableMapSvg;
