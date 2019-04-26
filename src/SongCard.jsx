import React from "react";

class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }
  async setTopTracks(songCard) {
    const options = {
      limit: 50
    }
    const spotifyClient = this.props.Spotify;

    await spotifyClient.getMyTopTracks(options).then((data) => {
      songCard.state.songs = data.items;
      console.log(songCard.state.songs)
    });
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


    this.setTopTracks(this);
    return (
      <div>
        {console.log(this.state.songs)}
      </div>
    )
  }


}

export default SongCard;
