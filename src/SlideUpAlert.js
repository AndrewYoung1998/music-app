import React, { useState, useEffect } from 'react';
import './LastfmSongData.css';//import css file
const SlideUpAlert = ({ message, duration }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    return (
        <div
            className={`slide-up-alert ${visible ? 'visible' : ''}`}
            onAnimationEnd={() => setVisible(false)}
        >
            <p>{message}</p>
        </div>
    );
};

export default SlideUpAlert;
