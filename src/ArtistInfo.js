import React, { useState } from 'react';
import './LastfmSongData.css';
const ArtistInfo = () => {
    const [artist, setArtist] = useState('');
    const [artistInfo, setArtistInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [artistTopTracks, setArtistTopTracks] = useState(null);
    const apiKey = 'e41cdbb8ee5a5f138aeb8c1a31cd31f5';
    const fetchArtistInfo = async () => {
        try {
            setIsLoading(true);
            //fetch artist info
            const response = await fetch(
                `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
                    artist )}&api_key=${apiKey}&format=json`
            );
            // fetch artist top tracks
            const artistTopTracks = await fetch(
                `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(
                    artist)}&api_key=${apiKey}&format=json`
            );
            //store artist top tracks date
            const artistTrackData = await artistTopTracks.json();
            //store artist info data
            const data = await response.json();
            //check if artist info exists
            if (data.artist && data.artist.bio && data.artist.bio.content) {
                //store artist info data in state
                setArtistInfo(data.artist);
                setArtistTopTracks(artistTrackData.toptracks.track);
            } else {
                //clear artist info data
                setArtistInfo(null);
                setArtist('');
                setArtistTopTracks(null)
                alert("Artist not found");
            }
            setIsLoading(false);
        } catch (error) {
            alert("There was an error please check your inputs");
        }
    };

    //handle fetch button click
    const handleFetchButtonClick = () => {
        //check if artist name is not empty
        if (artist != null && artist !== '') {
            //fetch artist info
            fetchArtistInfo();
        }else{
            //clear artist info data
            setArtistInfo(null)
            alert("Please enter artist name")
        }
    };

    return (
        <div>
            <div className={"input-layout"}>
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder={"Enter Artist Name"} />
                <button onClick={handleFetchButtonClick}>Fetch Artist Info</button>
            </div>
            {isLoading && <div>Loading artist info...</div>}
            {/*Artist Info }*/}
            {artistInfo && (
                <div className="grid-container">
                    <h2>{artistInfo.name}</h2>
                    <div className="summary-pic-container">
                        <div>
                            <p dangerouslySetInnerHTML={{ __html: artistInfo.bio.summary }}></p>
                            <ul className="tag-list">
                                {artistInfo.tags.tag.map((tag) => (
                                    <li key={tag.name}>{tag.name}</li>
                                ))}
                            </ul>
                        </div>
                        <img src={artistInfo.image[3]['#text']} alt={artistInfo.name} />
                    </div>
                </div>
            )}
            <br/>
            {/*Top 5 Tracks*/}
            {artistTopTracks && (
                <div className="grid-container">
                    <h2>{artistInfo.name}'s Top 5 Tracks</h2>
                    <div className="top-tracks-container">
                        {artistTopTracks.slice(0,5).map((track) => (
                            <div key={track.name} className="top-track">
                                <img src={track.image[3]['#text']} alt={track.name} />
                                <p>{track.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistInfo;
