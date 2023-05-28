import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LastfmSongData from './LastfmSongData';
import ArtistInfo from './ArtistInfo';
import TopTracks from './TopTracks';
import './index.css';
function App() {

    return (
        <div className="App">
            <div className="leftPanel">
                <TopTracks />
            </div>

            <div className="rightPanel">
                <Tabs>
                    <TabList>
                        <Tab>Artist Info</Tab>
                        <Tab>Last.fm Song Data</Tab>
                    </TabList>

                    <TabPanel>
                        <ArtistInfo />
                    </TabPanel>

                    <TabPanel>
                        <LastfmSongData />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default App;
