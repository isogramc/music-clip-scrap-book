import React, { useEffect, useState } from 'react';
import Playback from './Playback'

function SelectableList({tracks, handleSelected}) {
  const [selected, setSelected] = useState(0);

  const handleItemClick = (e) => {
    console.log("id", e.target);
    let trackId = e.target.getAttribute(['data-trackId']);
    let elementId = e.target.id;
    console.log("element", elementId, "trackId", trackId);
    setSelected(elementId);
    handleSelected(trackId);
  };

  return (
    <ul className='selectable-list'>
      {tracks?.map((track, index)=>
        <li key={index} id={track.id} className={selected === index ? "selected" : ""} >    
            <div> <div id={index} data-trackId={track.id} onClick={(e) => handleItemClick(e)}>{index+1}. {track.instructions}</div> <Playback playSong={track}/></div>
        </li>
      )}
    </ul>
  );
}

export default SelectableList