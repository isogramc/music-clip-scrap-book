import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

function VideoTuts(){
    //const playlist = 'https://www.youtube.com/playlist?list=PLcra99ke46lhAFgSCIOLk-b-N065dskse';
    const url = 'http://www.youtube.com/embed?listType=playlist&list=PLcra99ke46lhAFgSCIOLk-b-N065dskse&authuser=3626016049.project.googleusercontent.com&autoplay=1';
    const apiUser = "3626016049.project.googleusercontent.com";
    var player;
    const [opts, setOpts] = useState({
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      }});

//On load, called to load the auth2 library and API client library.
// gapi.load('client:auth2', initClient);

// function initClient() {
//   gapi.client.init({
//     discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
//     clientId: '3626016049.project.googleusercontent.com',
//     scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
//   }).then(function () {
//     // do stuff with loaded APIs
//         return gapi.client.youtube.playlistItems.list({
//           "part": [
//             "snippet,contentDetails"
//           ],
//           "maxResults": 25,
//           "playlistId": "PLcra99ke46lhAFgSCIOLk-b-N065dskse"
//         }).then(function(response) {
//             // Handle the results here (response.result has the parsed body).
//             console.log("Response", response);
//             setResponse(response);
//         }, function(err) { console.error("Execute error", err); });
      
//   });
// } https://www.youtube.com/watch?v=NUVQIwO1SEI


    
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