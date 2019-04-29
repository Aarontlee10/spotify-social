import React from "react";
import ArtistCard from "./ArtistCard.jsx";
import UserInfo from "./UserInfo.jsx";

class ArtistCards extends React.Component {
  constructor(props) {
    super(props);
    this.artistCards = [];
  }

  async getArtistCards() {
    this.artistCards = [];
    await this.props.artists.map(artist => {
      this.artistCards.push(
        <ArtistCard Spotify={this.props.Spotify} artistId={artist} />
      );
    });
  }

  render() {
    this.getArtistCards();
    return (
      <div>
        <div>{this.artistCards}</div>
      </div>
    );
  }
}

export default ArtistCards;
