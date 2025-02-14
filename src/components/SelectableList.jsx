import React, { useEffect, useState } from 'react';
import Playback from './Playback'

function SelectableList({tracks, handleSelected}) {
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(null);

  const handleItemClick = (e, track) => {
    //console.log("id", e.target);
    let trackId = e.target.getAttribute(['data-trackId']);
    let elementId = e.target.id;
    //console.log("element", elementId, "trackId", trackId);
    setSelected(elementId);
    setActive(track);
    handleSelected(track);
  };

   const setDynamicClass=(index)=>{
     return selected === index ? "selected" : "";
   }

  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <ul className="selectable-list">
      {tracks?.map((track, index) => (
        <li
          key={index}
          id={track.id}
          className={`list-item ${active == track && "active"} ${selected === index ? "active" : ""}`}
        >
          <div>
            <div
              id={index}
              data-trackId={track.id}
              onClick={(e) => handleItemClick(e, track)}
              style={{fontSize: "20px", textDecoration: "underline", cursor:"grab"}}
            >
              {index + 1}. {track.isChallenge?"Daily Challenge":capitalizeFirstLetter(track.instructions)}
            </div>
            <Playback playSong={track} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SelectableList