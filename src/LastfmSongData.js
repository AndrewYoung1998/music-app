import React, { useState } from 'react';
import './LastfmSongData.css'; // import the CSS file
import SlideUpAlert from "./SlideUpAlert";

function LastfmSongData() {
    //State variables
    const [song, setSong] = useState('');
    const [data, setData] = useState(null);
    const [showAlert, setShowAlert] = useState({
        show: false,
        message: '',
    });
    //Function to handle form submition
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.API_KEY}&artist=${encodeURIComponent(song.artist)}&track=${encodeURIComponent(song.track)}&format=json`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            if(song === '' || song === null){
                setData(null);
                setShowAlert({
                    show: true,
                    message: 'Enter a song and artist name.'
                })
            }else if(json.error){
                setData(null);
                setShowAlert({
                    show: true,
                    message: 'Song not found. Please try again.'
                })
            }else{
                setData({
                    name: json.track.name,
                    artist: json.track.artist.name,
                    listeners: parseInt(json.track.listeners).toLocaleString(),
                    playcount: parseInt(json.track.playcount).toLocaleString(),
                    duration: formatDuration(json.track.duration),
                    image: json.track.album.image[3]['#text'],
                    tags: json.track.toptags.tag,
                });
            }
        } catch (error) {
            setShowAlert({
                show: true,
                message: 'Something went wrong. Please try again later.',
            })
        }
    };
    //Function to format duration from seconds to minutes and seconds
    function formatDuration(durationInSeconds) {
        const seconds = Math.floor((durationInSeconds / 1000) % 60)
        const minutes = Math.floor((durationInSeconds / (1000 * 60)) % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    //Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...song, [name]: value });
    };

    return (
        <div className="lastfm-song-data">
            <div className="song-input-parent">
                <div className={"input-layout"}>
                    <input type="text" name="artist" onChange={handleInputChange} placeholder={"Enter Artist Name"} />
                    <input type="text" name="track" onChange={handleInputChange} placeholder={"Enter Song Name"}/>
                </div>
                <button onClick={handleSubmit} type={"submit"}>Fetch Song Info</button>
            </div>
            {showAlert.show && (
                <SlideUpAlert message={showAlert.message} duration={3000} showAlert={setShowAlert}/>
            )}
            {data && (
                <div className="song-data summary-pic-container">
                        <div className={"song-data-info"}>
                            <h2>{data.name}</h2>
                            <p>By {data.artist}</p>
                            <p>Listeners: {data.listeners}</p>
                            <p>Playcount: {data.playcount}</p>
                            <p>Duration: {data.duration}</p>
                            <ul className="tag-list">
                                {data.tags.map((tag) => (
                                    <li key={tag.name}>{tag.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={"song-data-pic"}>
                            <img className="image-container" src={data.image} alt={data.name} />
                        </div>
                </div>
            )}
        </div>
    );
}

export default LastfmSongData;
