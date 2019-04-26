import React from "react";

class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
    this.spotifyClient = this.props.Spotify;
  }

  setTopTracks = async () => {
    const options = {
      limit: 50
    };


    await this.spotifyClient.getMyTopTracks(options).then(data => {
      this.setState({ songs: data.items });
      // console.log(this.state.songs)
    });
  };

  setCurrentUser = async () => {
    await this.spotifyClient.getMe().then(data => {
      console.log(data);
      this.setState({user: data});
    })
  }

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
    this.setCurrentUser();
    if (this.state.songs.length > 0) {
      return (
        <div>{this.state.songs[0].name}</div>
      )
    }
    return <div></div>;
  }
}

export default SongCard;
