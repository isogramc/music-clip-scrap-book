import { useState } from 'react'
import soundC from './assets/middleC.mp3'
import soundD from './assets/middleD.mp3'
import soundE from './assets/middleE.mp3'
import soundF from './assets/middleF.mp3'
import soundG from './assets/middleG.mp3'
import soundA from './assets/middleA.mp3'
import soundB from './assets/middleB.mp3'
import soundC1 from './assets/c1.mp3'
import chordC from './assets/c-chord.mp3'
import './App.css'

function App() {
    var [sound, setSound] = useState(null)
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

  return (
    <>
      <div className="visuals">
      </div>
      <h1>Hello Piano</h1>
        <div className="keyboard">
            <button onClick={() => playNote(noteC0)}>
                {noteC0.name}
            </button>
            <button onClick={() => playNote(noteD0)}>
                {noteD0.name}
            </button>
            <button onClick={() => playNote(noteE0)}>
                {noteE0.name}
            </button>
            <button onClick={() => playNote(noteF0)}>
                {noteF0.name}
            </button>
            <button onClick={() => playNote(noteG0)}>
                {noteG0.name}
            </button>
            <button onClick={() => playNote(noteA0)}>
                {noteA0.name}
            </button>
            <button onClick={() => playNote(noteB0)}>
                {noteB0.name}
            </button>
            <button onClick={() => playNote(noteC1)}>
                {noteC1.name}
            </button>
        </div>
    </>
  )
}

export default App
