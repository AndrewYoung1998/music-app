import React, { useState } from 'react';
import './LastfmSongData.css'; // import the CSS file

function LastfmSongData() {
    const [song, setSong] = useState('');
    const [data, setData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiKey = 'e41cdbb8ee5a5f138aeb8c1a31cd31f5';
        const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(song.artist)}&track=${encodeURIComponent(song.track)}&format=json`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            if(json.error){
                setData(null);
                alert(json.message);
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
            alert("There was an error please check your inputs")
        }
    };
    //Function to format duration from seconds to minutes and seconds
    function formatDuration(durationInSeconds) {
        const seconds = Math.floor((durationInSeconds / 1000) % 60)
        const minutes = Math.floor((durationInSeconds / (1000 * 60)) % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
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
