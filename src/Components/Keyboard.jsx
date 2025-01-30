import { useState, createElement, useRef } from 'react'
import newKey from './ClickableDiv'
import soundC from './../assets/middleC.mp3'
import soundD from './../assets/middleD.mp3'
import soundE from './../assets/middleE.mp3'
import soundF from './../assets/middleF.mp3'
import soundG from './../assets/middleG.mp3'
import soundA from './../assets/middleA.mp3'
import soundB from './../assets/middleB.mp3'
import soundC1 from './../assets/c1.mp3'
import chordC from './../assets/c-chord.mp3'


function Keyboard(){

    var [sound, setSound] = useState(null)
    const [keys, setKeys] = useState(['div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'div','div', 'div', 'div', 'div']);
    const [noteC0, setNoteC0] = useState({name: "C", sound: soundC, chord: chordC})
    const [noteD0, setNoteD0] = useState({name: "D", sound: soundD})
    const [noteE0, setNoteE0] = useState({name: "E", sound: soundE})
    const [noteF0, setNoteF0] = useState({name: "F", sound: soundF})
    const [noteG0, setNoteG0] = useState({name: "G", sound: soundG})
    const [noteA0, setNoteA0] = useState({name: "A", sound: soundA})
    const [noteB0, setNoteB0] = useState({name: "B", sound: soundB})
    const [noteC1, setNoteC1] = useState({name: "C1", sound: soundC1})

    function playNote(note, req){
        var snd = new Audio();
        sound = document.createElement("source");
        sound.type = "audio/mpeg"
        sound.volume = 0.5;
        if(req==="chord"){
            sound.src = note.chord;
        }else {
            sound.src = note.sound;
        }
        snd.appendChild(sound);
        snd.play();
    }

    function playChord(note){
        playNote(note, "chord");
    }

    function handleClick(){
        console.log("test");
    }

    return (
        <div className='piano-container'>
            {
                keys.map((el, index) => 
                     createElement(
                        el,
                        { className: index < 10 ? "black-key" : "white-key" },
                      )
                )
            }
        </div>
    );
}
export default Keyboard