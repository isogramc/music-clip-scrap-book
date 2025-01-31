import { useState, createElement, useRef } from 'react'
import NewKey from './ClickableDiv'

function Keyboard(){

    var [sound, setSound] = useState(null)
    const [keys, setKeys] = useState(Array(24).fill(null));

    return (
        <div className='piano-container'>
            {
                keys.map((el, index) =>
                    <NewKey key={index} index={index} keyClass={index < 10 ? "tkb-black-key" : "tkb-white-key"}/>
                )
            }
        </div>
    );
}
export default Keyboard