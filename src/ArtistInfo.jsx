import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardImg } from 'reactstrap';

class ArtistInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    return (
      <div>
        <Button outline color="secondary" onClick={this.toggle}>{this.props.artistName}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.artistName}</ModalHeader>
          <ModalBody>
          <CardImg
            style={{
              maxHeight: "20%",
              maxWidth: "20%",
              float: "left",
              marginRight: "15px"
            }}
            src={this.props.artistImg}
          />
            <div>Followers: {this.props.artistData.followers.total}</div>
            <div>Genre: {this.props.artistData.genres[0]}</div>
            <div>Popularity: {this.props.artistData.popularity}/100</div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" href={this.props.artistData.uri}>Go To Artist Page on Spotify</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

}

export default ArtistInfo;
