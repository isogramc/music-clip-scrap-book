import React, { useEffect, useRef, useState } from 'react';
import * as Tone from "tone";

const ClickableDiv = ({ index, keyClass }) => {

    const divRef = useRef(null);
    const [lowerRegNotes, setLowerRegNotes] = useState(["C", "D", "E", "F", "G", "A", "B"]);
    const [upperRegNotes, setUpperRegNotes] = useState(["C#", "Eb", "F#", "G#", "Bb"]);


    useEffect(() => {
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

        async function handleClick(e){
            let note = e.target.id;
            let key = "";
            let position = "4";
    
            if(note<=4 && note<9){
                key = upperRegNotes[Number(note)]
                position = "4";
                key = key + position;
            }
            if(note>4 && note<=9){
                key = upperRegNotes[Number(note)-5];
                position = "5"; 
                key = key + position;
            }
    
            if(note>9 && note<=16){
                key = lowerRegNotes[Number(note.charAt(1))]
                position = "4";
                key = key + position;
            }
            if(note>9 && note>16 && note<20){
                key = lowerRegNotes[Number(note.charAt(1)-7)]
                position = "5";
                key = key + position;
            }
            if(note>9 && note>=20){
                key = lowerRegNotes[Number(note)-17]
                position = "5";
                key = key + position;
            }
         
            await Tone.loaded().then(() => {
                console.log("key", key);
                sampler.triggerAttackRelease(key, 1.2);
            });
        };

        const div = divRef.current;

        if (div) {
            div.addEventListener('click', handleClick);
        }

        // Cleanup event listener when the component unmounts
        return () => {
            if (div) {
                div.removeEventListener('click', handleClick);
            }
        };
    }, []);

    return (
        <div ref={divRef} key={index} id={index} className={keyClass}></div>
    );
};

export default ClickableDiv;