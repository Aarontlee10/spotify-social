import React from "react";

class ArtistCard extends React.Component {
  constructor(props) {
    super(props);
    this.artistId = this.props.artistId;
    this.Client = this.props.Spotify;
    this.state = {
      topTracks: [],
      artistName: ""
    }
  }

  getArtistTracks = async () => {
    await this.Client.getArtistTopTracks(this.artistId, "us").then(data => {
      const trackNames = [];
      data.tracks.map((track) => {trackNames.push(track.name)});
      this.setState({topTracks: trackNames});
    })
  }

  getArtistName = async () => {
    await this.Client.getArtist(this.artistId, "us").then(data => {
      this.setState({artistName: data.name});
    })
  }

  render() {
    if (this.state.topTracks.length > 0) {
      console.log(this.state.topTracks);
      return (
        <div>
          <div>{this.state.artistName}</div>
          <div>{this.state.topTracks}</div>
        </div>
      )
    }
    this.getArtistName();
    this.getArtistTracks();
    return <div></div>
  }
}

export default ArtistCard;
