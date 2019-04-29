import React from "react";
import ArtistCard from "./ArtistCard.jsx";
import UserInfo from "./UserInfo.jsx";

class ArtistCards extends React.Component {
  constructor(props) {
    super(props);
    this.artistCards = [];
  }

  async getArtistCards() {
    await this.props.artists.map(artist => {
      this.artistCards.push(
        <ArtistCard Spotify={this.props.Spotify} artistId={artist} />
      );
    });
  }

  render() {
    this.getArtistCards();
<<<<<<< HEAD
    return <div>{this.artistCards}</div>;
=======
    return (
      <div>
        <div>{this.artistCards}</div>
      </div>
    )
>>>>>>> 2c56386aadc444eb8b87b60397c8794372336e3b
  }
}

export default ArtistCards;
