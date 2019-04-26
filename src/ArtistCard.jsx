import React from "react";

class ArtistCard extends React.Component {
  constructor(props) {
    super(props);
    this.artistId = this.props.artistId;
    this.Client = this.props.Spotify;
    this.artistTopTracks = [];
  }

  async getArtistTracks() {
    await this.Client.getArtistTopTracks(this.ArtistID).then(data => {
      this.artistTopTracks = data.items;
    })
  }

  render() {
    this.getArtistTracks();
    if (this.artistTopTracks.length >= 0) {
      return (
        <div>{this.artistTopTracks[0]}</div>
      )
    }
  }
}

export default ArtistCard;
