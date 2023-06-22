// Description: This file contains the TopTracks component. This component fetches the top tracks data from the Last.fm API and displays it on the page.
import React, { useState, useEffect } from "react";
import "./LastfmSongData.css";

const TopTracks = () => {
    //State variables
    const [tracks, setTracks] = useState([]);

    //useEffect hook to fetch top tracks data
    useEffect(() => {
        const loadTopTracks = async () => {
            try {
                const response = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=5`
                );
                const data = await response.json();
                setTracks(data.tracks.track);
            } catch (error) {
                console.error(error);
            }
        };
        loadTopTracks();
    }, []);

    //return top tracks data to be displayed on the page
    return (
        <div className="top-tracks">
            <h2>Top Tracks on Last.fm</h2>
            {tracks.length > 0 && (
                <ul className="track-list">
                    {tracks.map((track) => (
                        <li key={track.name}>
                            <div className="image-container-track">
                                <img src={track.image[2]["#text"]} alt={track.name} />
                            </div>
                            <div className="track-info">
                                <h3>{track.name}</h3>
                                <h4>{track.artist.name}</h4>
                                <p>{track.listeners} listeners</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default TopTracks;
