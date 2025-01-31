
import './App.css'
import { Note, Scale } from "tonal";
import Keyboard from './Components/Keyboard'

function App() {
  const key = Scale.get("C major").notes;
   
  return (
    <div className="visuals">
     <Keyboard/>
    </div>
  )
}

export default App
