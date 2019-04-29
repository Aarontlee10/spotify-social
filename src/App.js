import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import ArtistCards from "./ArtistCards.jsx";
import Search from "./Search.jsx";
import UserInfo from "./UserInfo.jsx";
import "./App.css";
import { Button } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      following: [],
      currentDevice: "",
      artists: [],
      searched: false
    };
  }

  getSearchResults = results => {
    this.setState({searched: true});
    if (results.length !== 0) {
      this.setState({artists: []});
      this.setState({ artists: results});
    } else {
      this.setState({artists: [], searched: false});
      this.getTopArtists();
    }
  };

  getTopArtists = async () => {
    const options = {
      limit: 10
    };
    await this.spotifyClient.getMyTopArtists(options).then(data => {
      var artistIds = [];
      data.items.map(artist => artistIds.push(artist.id));
      this.setState({ artists: artistIds });
    });
  };

  async componentDidMount() {
    if (window.location.hash) {
      // Remove the "#"
      const queryString = window.location.hash.substring(1);
      // Parse the access_token out
      this.accessToken = new URLSearchParams(queryString).get("access_token");
      this.spotifyClient = new Spotify();
      this.spotifyClient.setAccessToken(this.accessToken);

      this.setState({
        authenticated: true
      });
    }
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <div className="App-header">
          <Button
            href={`https://accounts.spotify.com/authorize/?client_id=468f8ece2880441da7f5c9531877c6ac&response_type=token&redirect_uri=${window
              .location.origin +
              window.location
                .pathname}&scope=user-read-playback-state user-modify-playback-state user-top-read user-read-private`}
            color="success"
          >
            Login with Spotify
          </Button>
        </div>
      );
    }
    else if (this.state.artists.length > 0) {
      return (
        // <ArtistCard
        //   Spotify={this.spotifyClient}
        //   artistId={this.state.artists[0].id}
        // />
        <div>
          <div className="userInfo">
            <UserInfo Spotify={this.spotifyClient} />
          </div>
          <div className="search">
            <Search
              spotifyClient={this.spotifyClient}
              passSearchResults={this.getSearchResults}
            />
          </div>
          <div className="artistCards">
            <ArtistCards
              Spotify={this.spotifyClient}
              artists={this.state.artists}
            />
          </div>
        </div>
      );
    }
    else if (this.state.searched === false) {
      this.getTopArtists();
    }
    return <div />;
  }
}

export default App;
