import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

function VideoTuts(){
    const playlist = 'https://www.youtube.com/playlist?list=PLcra99ke46lhAFgSCIOLk-b-N065dskse';
    var player;
    const [opts, setOpts] = useState({
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      }});

    
return (
  <div className='player-wrapper'>
    <ReactPlayer
      className='react-player'
      url='https://www.youtube.com/watch?v=NUVQIwO1SEI'
    />
  </div>
)
    
}
export default VideoTuts