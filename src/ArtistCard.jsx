import React from "react";
import ArtistInfo from "./ArtistInfo.jsx";
import { Card, CardImg, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import "./App.css";

class ArtistCard extends React.Component {
  constructor(props) {
    super(props);
    this.artistId = this.props.artistId;
    this.Client = this.props.Spotify;
    this.state = {
      topTrackIds: [],
      topTrackNames: [],
      artistName: "",
      artistImg: "",
      currentTrackId: "",
      artistData: null
    };
  }

  playSong = async trackId => {
    if (this.state.currentTrackId !== trackId) {
      await this.Client.play({
        uris: [`spotify:track:${trackId}`]
      });
      this.setState({ currentTrackId: trackId });
    } else {
      await this.Client.pause();
      this.setState({ currentTrackId: "" });
    }
  };

  getArtistTracks = async () => {
    await this.Client.getArtistTopTracks(this.artistId, "us").then(data => {
      const trackNames = [];
      const trackIds = [];
      data.tracks.map(track => {
        trackNames.push(track.name);
        trackIds.push(track.id);
      });
      this.setState({ topTrackNames: trackNames, topTrackIds: trackIds });
    });
  };

  getArtistName = async () => {
    await this.Client.getArtist(this.artistId, "us").then(data => {
      if (data.images.length === 0) {
        data.images.push({url: ""});
      }
      this.setState({
        artistName: data.name,
        artistImg: data.images[0].url,
        artistData: data
      });
    });
  };

  render() {
    if (this.state.topTrackNames.length > 0 && this.state.artistData != null) {
      this.artistInfo = (
        <ArtistInfo
          Spotify={this.Client}
          artistId={this.artistId}
          artistName={this.state.artistName}
          artistData={this.state.artistData}
          artistImg={this.state.artistImg}
        />
      );
      return (
        <div className="artistCard">
          <Card>
            <CardBody>
              <div className="artistButton">
                {this.artistInfo}
              </div>
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
                <ListGroupItem
                  onClick={e => this.playSong(this.state.topTrackIds[0])}
                  tag="button"
                  action
                >
                  {this.state.topTrackNames[0]}
                </ListGroupItem>
                <ListGroupItem
                  onClick={e => this.playSong(this.state.topTrackIds[1])}
                  tag="button"
                  action
                >
                  {this.state.topTrackNames[1]}
                </ListGroupItem>
                <ListGroupItem
                  onClick={e => this.playSong(this.state.topTrackIds[2])}
                  tag="button"
                  action
                >
                  {this.state.topTrackNames[2]}
                </ListGroupItem>
                <ListGroupItem
                  onClick={e => this.playSong(this.state.topTrackIds[3])}
                  tag="button"
                  action
                >
                  {this.state.topTrackNames[3]}
                </ListGroupItem>
                <ListGroupItem
                  onClick={e => this.playSong(this.state.topTrackIds[4])}
                  tag="button"
                  action
                >
                  {this.state.topTrackNames[4]}
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
