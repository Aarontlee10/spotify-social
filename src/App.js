import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import SongCard from "./SongCard.jsx";
import * as firebase from "firebase/app";
import "firebase/firestore";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      following: [],
      currentDevice: ""
    };
  }

  async componentDidMount() {
    if (window.location.hash) {
      // Remove the "#"
      const queryString = window.location.hash.substring(1);
      // Parse the access_token out
      this.accessToken = new URLSearchParams(queryString).get("access_token");
      this.spotifyClient = new Spotify();
      this.spotifyClient.setAccessToken(this.accessToken);

      const { devices } = await this.spotifyClient.getMyDevices();
      // const devices = Object.keys(devicesResp).map(key => devicesResp[key]);
      this.setState({
        authenticated: true
      });
    }
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <a
          href={`https://accounts.spotify.com/authorize/?client_id=468f8ece2880441da7f5c9531877c6ac&response_type=token&redirect_uri=${window
            .location.origin +
            window.location
              .pathname}&scope=user-read-playback-state user-modify-playback-state user-top-read user-read-private`}
        >
          Login with Spotify
        </a>
      );
    }

    return <SongCard Spotify={this.spotifyClient} token={this.accessToken} />;
  }
}

export default App;
