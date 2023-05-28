import React, { useState } from 'react';
import './LastfmSongData.css'; // import the CSS file

function LastfmSongData() {
    const [song, setSong] = useState('');
    const [data, setData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

            const apiKey = 'e41cdbb8ee5a5f138aeb8c1a31cd31f5';
        const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${song.artist}&track=${song.track}&format=json`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            setData({
                name: json.track.name,
                artist: json.track.artist.name,
                listeners: json.track.listeners,
                playcount: json.track.playcount,
                image: json.track.album.image[3]['#text'],
                tags: json.track.toptags.tag,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...song, [name]: value });
    };

    return (
        <div className="lastfm-song-data">
            <form onSubmit={handleSubmit}>
                <label>
                    Artist:
                    <input type="text" name="artist" onChange={handleInputChange} />
                </label>
                <label>
                    Song:
                    <input type="text" name="track" onChange={handleInputChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {data && (
                <div className="song-data">
                    <h2>{data.name}</h2>
                    <p>By {data.artist}</p>
                    <div className="image-container">
                        <img src={data.image} alt={data.name} />
                    </div>
                    <p>Listeners: {data.listeners}</p>
                    <p>Playcount: {data.playcount}</p>
                    <ul className="tag-list">
                        {data.tags.map((tag) => (
                            <li key={tag.name}>{tag.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default LastfmSongData;
