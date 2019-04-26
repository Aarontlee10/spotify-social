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
      artistName: ""
    };
  }

  getArtistTracks = async () => {
    await this.Client.getArtistTopTracks(this.artistId, "us").then(data => {
      const trackNames = [];
      console.log(data);
      data.tracks.map(track => {
        trackNames.push(track.name);
      });
      this.setState({ topTracks: trackNames });
    });
  };

  getArtistName = async () => {
    await this.Client.getArtist(this.artistId, "us").then(data => {
      this.setState({ artistName: data.name });
    });
  };

  render() {
    if (this.state.topTracks.length > 0) {
      console.log(this.state.topTracks);
      return (
        <div>
          <Card>
            <CardImg
              top
              width="100%"
              src="../public/favicon.ico"
              alt={this.state.artistName}
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
