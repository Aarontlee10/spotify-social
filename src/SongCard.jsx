import React from "react";

class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
  }

  setTopTracks = async () => {
    const options = {
      limit: 50
    };
    const spotifyClient = this.props.Spotify;

    await spotifyClient.getMyTopTracks(options).then(data => {
      this.setState({ songs: data.items });
      // console.log(this.state.songs)
    });
  };

  render() {
    // var spotifyClient = this.props.Spotify;
    // const options = {
    //   limit: 50
    // }
    //
    // spotifyClient.getMyTopTracks(options).then((data) => {
    //   this.state.songs = data.items
    //   console.log(data.items);
    // });

    this.setTopTracks();
    // console.log(this.state.songs);
    return <div>{}</div>;
  }
}

export default SongCard;
