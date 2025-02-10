import { useEffect, useState } from 'react';
import axios from 'axios'

function VideoTuts(){
    const url = 'http://www.youtube.com/embed?listType=playlist&list=PLcra99ke46lhAFgSCIOLk-b-N065dskse&autoplay=1';
    const [videos, setVideos] = useState();
    
    return (
      <div>
        <iframe
          width="560"
          height="315"
          src={url}
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    );
}
export default VideoTuts