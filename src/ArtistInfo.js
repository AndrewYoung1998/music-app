import React, { useState, useEffect } from 'react';

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
            setArtistInfo(data.artist);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching artist info:', error);
            setIsLoading(false);
        }
    };

    const handleFetchButtonClick = () => {
        if (artist) {
            fetchArtistInfo();
        }
    };

    return (
        <div>
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <button onClick={handleFetchButtonClick}>Fetch Artist Info</button>
            {isLoading && <div>Loading artist info...</div>}
            {artistInfo && (
                <div>
                    <h2>{artistInfo.name}</h2>
                    <p dangerouslySetInnerHTML={{ __html: artistInfo.bio.summary }} ></p>
                    <img src={artistInfo.image[1]['#text']} alt={artistInfo.name} />
                    <ul className="tag-list">
                        {artistInfo.tags.tag.map((tag) => (
                            <li key={tag.name}>{tag.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ArtistInfo;
