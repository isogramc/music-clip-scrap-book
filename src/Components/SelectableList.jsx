import React, { useState } from 'react';
import Playback from '../components/Playback'

function SelectableList({tracks, handleSelected}) {
  const [selected, setSelected] = useState(1); // Initialize with -1 to indicate no selection

  const handleItemClick = (index) => {
    setSelected(index);
    handleSelected(index);
  };

  return (
    <ul>
      {tracks?.map((track, index)=>
        <li
          key={index}
          onClick={() => handleItemClick(index)}
          className={selected === index ? "selected" : ""}
        >    
            <div> {index+1}. <Playback playSong={track}/></div>
        </li>
      )}
    </ul>
  );
}

export default SelectableList