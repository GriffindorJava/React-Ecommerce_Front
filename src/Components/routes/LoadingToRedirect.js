import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() => {
        
        const interval = setInterval(() => {
            setCount((curentCount) => --curentCount);
        }, 1000);
        // redirect once count is equal to 0
        count === 0 && history.push('/');
        // cleanup
        return () => clearInterval(interval);
    },[count, history]);

    return (
        <div className='container p-5 text-center'>
            <h4>Redirecting you in {count} seconds</h4>
        </div>
    )
    
};

export default LoadingToRedirect;