
import * as React from 'react'

const InteractiveSvg = (props) => {
    const [color, setColor] = React.useState('blue');
    const [color1, setColor1] = React.useState('pink');

   return ( 
        <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" {...props}>
            <title>{props.song.title}</title>
            
            <rect x="10" y="10" width="30" height="30" stroke={color} fill={color1} stroke-width="5" onClick={() => setColor('red')}/>

        </svg> 
    )
}

export default InteractiveSvg