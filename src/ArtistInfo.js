
import React, { useState } from 'react';
import './LastfmSongData.css';
import SlideUpAlert from "./SlideUpAlert";
//Create a functional component for the Lastfm Artist Data
const ArtistInfo = () => {
    //State variables
    const [artist, setArtist] = useState('');
    const [artistInfo, setArtistInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [artistTopTracks, setArtistTopTracks] = useState(null);
    const [showAlert, setShowAlert] = useState({
        show: false,
        message: '',
    });
    //Function to handle form submission
    const fetchArtistInfo = async () => {
        try {
            setIsLoading(true);
            //fetch artist info
            const response = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
            );
            // fetch artist top tracks
            const artistTopTracks = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artist)}&api_key=${process.env.REACT_APP_API_KEY}&format=json`
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
                setTimeout(() => {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth',
                    });}, 500);
            } else {
                //clear artist info data
                setArtistInfo(null);
                setArtist('');
                setArtistTopTracks(null)
                //show alert
                setShowAlert({
                    show: true,
                    message: 'Artist not found. Please try again.',
                })
            }
            setIsLoading(false);
        } catch (error) {
            //clear artist info data
            setArtistInfo(null);
            setArtist('');
            setArtistTopTracks(null);
            //show alert
            setShowAlert({
                show: true,
                message: 'Something went wrong. Please try again later.',
            })
        }
    };

    //handle fetch button click
    const handleFetchButtonClick = () => {
        //check if artist name is not empty
        if (artist !== '') {
            //fetch artist info
            fetchArtistInfo();
        }else{
            //clear artist info data
            setArtistInfo(null);
            setArtist('');
            setArtistTopTracks(null);
            setShowAlert({
                show: true,
                message: 'Please enter artist name',
            })
        }
    };
    //return JSX for the component (Artist Info)
    return (
        <div>
            <div className={"input-layout"}>
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder={"Enter Artist Name"} />
                <button onClick={handleFetchButtonClick}>Fetch Artist Info</button>
            </div>
            {showAlert.show && (
                <SlideUpAlert message={showAlert.message} duration={3000} showAlert={setShowAlert}/>
            )}
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
