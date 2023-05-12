import React, { useState } from 'react';
import './LastfmSongData.css';

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
        <div className="lastfm-container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">
                        Artist:
                        <input type="text" name="artist" onChange={handleInputChange} />
                    </label>
                    <label className="input-label">
                        Song:
                        <input type="text" name="track" onChange={handleInputChange} />
                    </label>
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
            {data && (
                <div className="song-data-container">
                    <h2 className="song-title">{data.name}</h2>
                    <p className="artist-name">By {data.artist}</p>
                    <img className="album-cover" src={data.image} alt={data.name} />
                    <p className="listener-count">Listeners: {data.listeners}</p>
                    <p className="play-count">Playcount: {data.playcount}</p>
                    <ul className="tag-list">
                        {data.tags.map((tag) => (
                            <li key={tag.name} className="tag">{tag.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default LastfmSongData;
