import React from 'react';
import Typewriter from 'typewriter-effect';

const Jumbotron = ({text}) => {
    return (
        <div>
            <Typewriter options={{
                strings: text,
                autoStart: true,
                loop: true,
            }} />
        </div>
    )
}

export default Jumbotron;
