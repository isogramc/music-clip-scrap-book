import React, { useEffect, useRef } from 'react';

const ClickableDiv = ({ index, keyclass }) => {
    const divRef = useRef(null);

    useEffect(() => {
        const handleClick = () => {
            alert('Div clicked!');
        };

        const div = divRef.current;
        if (div) {
            div.addEventListener('click', handleClick);
        }

        // Cleanup event listener when the component unmounts
        return () => {
            if (div) {
                div.removeEventListener('click', handleClick);
            }
        };
    }, []);

    return (
        <div ref={divRef} key={index} className={keyclass}></div>
    );
};

export default ClickableDiv;