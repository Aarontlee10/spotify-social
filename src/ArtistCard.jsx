import React from "react";
import ArtistInfo from "./ArtistInfo.jsx";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";

class ArtistCard extends React.Component {
  constructor(props) {
    super(props);
    this.artistId = this.props.artistId;
    this.Client = this.props.Spotify;
    this.state = {
      topTracks: [],
      artistName: "",
      artistImg: "",
      artistData: null
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
      this.setState({ artistName: data.name, artistImg: data.images[0].url, artistData: data});
    });
  };

  render() {
    if (this.state.topTracks.length > 0 || this.state.artistData != null) {
      this.artistInfo = <ArtistInfo
        Spotify={this.Client}
        artistId={this.artistId}
        artistName={this.state.artistName}
        artistData={this.state.artistData}
      />
      return (
        <div>
          <Card>
            <CardBody>
              {this.artistInfo}
              <CardImg
                src={this.state.artistImg}
                alt={this.state.artistName}
                style={{
                  float: "left",
                  marginTop: "50px",
                  marginRight: "20px",
                  maxHeight: "10%",
                  maxWidth: "10%"
                }}
              />
              <ListGroup>
                <ListGroupItem tag="button" action>
                  {this.state.topTracks[0]}
                </ListGroupItem>
                <ListGroupItem tag="button" action>
                  {this.state.topTracks[1]}
                </ListGroupItem>
                <ListGroupItem tag="button" action>
                  {this.state.topTracks[2]}
                </ListGroupItem>
                <ListGroupItem tag="button" action>
                  {this.state.topTracks[3]}
                </ListGroupItem>
                <ListGroupItem tag="button" action>
                  {this.state.topTracks[4]}
                </ListGroupItem>
              </ListGroup>
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
