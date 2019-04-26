import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

class ArtistCard extends React.Component {
  constructor(props) {
    super(props);
    this.artistId = this.props.artistId;
    this.Client = this.props.Spotify;
    this.state = {
      topTracks: [],
      artistName: "",
      artistImg: ""
    };
  }

  getArtistTracks = async () => {
    await this.Client.getArtistTopTracks(this.artistId, "us").then(data => {
      const trackNames = [];
      data.tracks.map(track => {
        trackNames.push(track.name);
      });
      this.setState({ topTracks: trackNames });
    });
  };

  getArtistName = async () => {
    await this.Client.getArtist(this.artistId, "us").then(data => {
      this.setState({ artistName: data.name, artistImg: data.images[0].url});
    });
  };

  render() {
    if (this.state.topTracks.length > 0) {
      console.log(this.state.artistImg);
      return (
        <div>
          <Card>
            <CardImg
              src={this.state.artistImg}
              alt={this.state.artistName}
              style={{maxHeight: "10%", maxWidth: "10%"}}
            />
            <CardBody>
              <CardTitle>{this.state.artistName}</CardTitle>
              <CardText>{this.state.topTracks}</CardText>
              <Button>Play</Button>
            </CardBody>
          </Card>
        </div>
      );
    }
    this.getArtistName();
    this.getArtistTracks();
    return <div />;
  }
}

export default ArtistCard;
