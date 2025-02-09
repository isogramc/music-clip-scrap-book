import React, { useState } from 'react';
import Playback from './Playback'

function SelectableList({tracks, handleSelected}) {
  const [selected, setSelected] = useState(0);

  const handleItemClick = (id) => {
    console.log(id);
    handleSelected(id);
  };

  return (
    <ul className='selectable-list'>
      {tracks?.map((track, index)=>
        <li key={index} id={track.id} onClick={(e) => handleItemClick(track.id)} className={selected === index ? "selected" : ""} >    
            <div> {index+1}. <Playback playSong={track}/></div>
        </li>
      )}
    </ul>
  );
}

export default SelectableList