import React from "react";
import {
   Button, Modal, ModalHeader, ModalBody, ModalFooter, CardImg, CardBody, ListGroup, ListGroupItem
 } from 'reactstrap';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      userData: null
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  getUser = async () => {
    await this.props.Spotify.getMe().then(data => {
      this.setState({userData: data});
    })
  }

  render() {
    this.getUser();
    if (this.state.userData != null) {
      return (
        <div>
          <Button
            outline color="secondary"
            onClick={this.toggle}
            style={{
              float: "left"
            }}>
            {this.state.userData.display_name}
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>{this.state.userData.display_name}</ModalHeader>
            <ModalBody>
              <CardImg
                style={{
                  maxHeight: "20%",
                  maxWidth: "20%",
                  float: "left",
                  marginRight: "15px"
                }}
                src={this.state.userData.images[0].url}
              />
              <div>
                <div>Followers: {this.state.userData.followers.total}</div>
                <div>Product Type: {this.state.userData.product}</div>
                <div>Country: {this.state.userData.country}</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" href={this.state.userData.uri}>Go To My Page on Spotify</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
    return <div />;
  }

}

export default UserInfo;
