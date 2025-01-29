
import './App.css'
import { Note, Scale } from "tonal";
import * as Tone from "tone";
import Keyboard from './Components/Keyboard'

function App() {
    const key = Scale.get("C major").notes;
    //create a synth and connect it to the main output (your speakers)

    function handleClick(){
        
        const synth = new Tone.Synth().toDestination();

        //play a middle 'C' for the duration of an 8th note
        const now = Tone.now();
        //setInterval(() => console.log(now, 10);
        // trigger the attack immediately
        synth.triggerAttackRelease("C4", "8n", now);
    }
   
  return (

    <div className="visuals">
        <button onClick={handleClick}>C</button>
        {key}
     <Keyboard/>
    </div>
  )
}

export default App
