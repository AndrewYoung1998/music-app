import React, { useState } from 'react';
import './LastfmSongData.css';
const ArtistInfo = () => {
    const [artist, setArtist] = useState('');
    const [artistInfo, setArtistInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchArtistInfo = async () => {
        try {
            setIsLoading(true);
            const apiKey = 'e41cdbb8ee5a5f138aeb8c1a31cd31f5';
            const response = await fetch(
                `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
                    artist
                )}&api_key=${apiKey}&format=json`
            );
            const data = await response.json();
            if (data.artist && data.artist.bio && data.artist.bio.content) {
                setArtistInfo(data.artist);
            } else {
                setArtistInfo(null);
                setArtist('');
                alert("Artist not found");
                console.error('Unexpected response:', data);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching artist info:', error);
            setIsLoading(false);
        }
    };

    const handleFetchButtonClick = () => {
        if (artist != null && artist !== '') {
            fetchArtistInfo();
        }else{
            setArtistInfo(null)
            alert("Please enter artist name")
        }
    };

    return (
        <div>
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <button onClick={handleFetchButtonClick}>Fetch Artist Info</button>
            {isLoading && <div>Loading artist info...</div>}
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
                        <img src={artistInfo.image[1]['#text']} alt={artistInfo.name} />
                    </div>
                </div>

            )}
        </div>
    );
};

export default ArtistInfo;
