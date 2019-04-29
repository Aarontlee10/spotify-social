import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  getArtistIdsFromData(data) {
    var artistIds = [];
    data.artists.items.map(artist => {
      artistIds.push(artist.id);
    });
    while (data.tracks.items.length > 0 && artistIds.length !== 10) {
      let currArtists = data.tracks.items.shift().artists;
      for (var artist in currArtists) {
        if (!(artist.id in artistIds)) {
          artistIds.push(artist.id);
        }
      }
    }
    artistIds = artistIds.filter(function(el) {
      return el != null;
    });
    return artistIds;
  }

  onSubmit = ev => {
    ev.preventDefault();
    if (this.state.query !== "") {
      this.props.spotifyClient
        .search(this.state.query, ["artist", "track"], {
          market: "us",
          limit: 10
        })
        .then(data => {
          this.setState({ results: this.getArtistIdsFromData(data) });
        });
    } else {
      this.setState({ results: [] });
    }
    this.props.passSearchResults(this.state.results);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          onChange={e => this.setState({ query: e.target.value })}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
}
export default Search;
