import React from "react";
import ArtistCard from "./ArtistCard.jsx";

class ArtistCards extends React.Component {
  constructor(props) {
    super(props);
    this.artistCards = [];
  }

  async getArtistCards() {
    await this.props.artists.map((artist) => {this.artistCards.push(
      <ArtistCard
      Spotify={this.props.Spotify}
      artistId={artist.id}/>
    )});
  }

  render() {
    this.getArtistCards();
    console.log(this.artistCards);
    return (
      <div>{this.artistCards}</div>
    )
  }

}

export default ArtistCards;
