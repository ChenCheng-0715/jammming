import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [],
    
      playlistName: "",

      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }


  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id  === track.id)) {
      return;
    }
    this.setState(prev => ({
      playlistTracks: [...prev.playlistTracks, track]
    }));

  }

  removeTrack(track) {
    this.setState({ playlistTracks: this.state.playlistTracks.filter(t => t != track) });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    // console.log(trackURIs);
    // console.log(this.state.playlistName);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({ playlistName: "" });
    this.setState({ playlistTracks: [] });
  }

  search(term) {
    // console.log(term);
    Spotify.search(term).then(searchResults => this.setState({
      searchResults: searchResults
    }));
    
    // console.log(this.state.searchResults);
    // this.setState({ searchResults: Spotify.search(term) });
  }


  render() {
      return (

        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                {/* <!-- Add a SearchBar component --> */}
                <SearchBar onSearch={this.search} />
                <div className="App-playlist">
                    {/* <!-- Add a SearchResults component --> */}
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                    {/* <!-- Add a Playlist component --> */}
                    <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
                </div>
            </div>
        </div>
      );
  }
}

export default App;