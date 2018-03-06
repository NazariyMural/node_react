import React, { Component } from "react";
import styles from "./UserProfileEdit.css";
import { connect } from "react-redux";

import {
  addUserProperty,
  addLocation,
  uploadData
} from "../../../actions/index";

import FlatButton from "material-ui/FlatButton";

class UserEdit extends Component {
  state = {
    editingPhone: false,
    editingAddress: false,
    editingName: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editingPhone) {
      this.refs.phone.focus();
    }
    if (this.state.editingAddress) {
      this.refs.address.focus();
    }
    if (this.state.editingName) {
      this.refs.userName.focus();
    }
  }

  renderDisplay = () => {
    return (
      <div>
        <ul>
          <li>
            {this.state.editingName ? (
              <form onSubmit={this.handleSubmitName} className={styles.Form}>
                <input type="text" ref="userName" />
                <button className="btn waves-effect waves-light" type="submit">
                  Submit
                </button>
                <button
                  className="btn waves-effect waves-light"
                  onClick={() => this.setState({ editingName: false })}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <span className={styles.userDataItem}>
                {this.props.auth.name ? (
                  <div className={styles.UserDataItemText}>
                    {this.renderUserName()}
                  </div>
                ) : null}
              </span>
            )}
          </li>

          <li>
            <div className={styles.userDataItem}>
              <div className={styles.UserDataItemText}>
                {this.renderUserEmail()}
              </div>
            </div>
          </li>

          <li>
            {this.state.editingPhone ? (
              <form onSubmit={this.handleSubmitPhone} className={styles.Form}>
                <input type="text" ref="phone" />
                <button className="btn waves-effect waves-light" type="submit">
                  Submit
                </button>
                <button
                  className="btn waves-effect waves-light"
                  onClick={() => this.setState({ editingPhone: false })}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <span className={styles.userDataItem}>
                {this.props.auth.phone ? (
                  <div className={styles.UserDataItemText}>
                    {this.renderUserPhone()}
                  </div>
                ) : (
                  <span className={styles.UserDataItemText}>
                    Add phone number{" "}
                    <i
                      className="material-icons"
                      onClick={this.handlePhoneEdit}
                    >
                      phone_iphone
                    </i>
                  </span>
                )}
              </span>
            )}
          </li>

          <li>
            {this.state.editingAddress ? (
              <form onSubmit={this.handleSubmitAddress} className={styles.Form}>
                <input type="text" ref="address" id="edit_input" />
                <button className="btn waves-effect waves-light" type="submit">
                  Submit
                </button>
                <button
                  className="btn waves-effect waves-light"
                  onClick={() => this.setState({ editingAddress: false })}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className={styles.userDataItem}>
                {this.props.auth.location ? (
                  <div>{this.renderUserLocation()}</div>
                ) : (
                  <span className={styles.UserAddItemText}>
                    Add your address{" "}
                    <i
                      className="material-icons"
                      onClick={this.handleAddressEdit}
                    >
                      add_location
                    </i>
                  </span>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    );
  };

  //name handler
  handleNameEdit = () => {
    this.setState({ editingName: true });
  };
  handleSubmitName = event => {
    let userName = this.refs.userName.value;
    if (!userName) {
      this.setState({ editingName: false });
      return;
    }
    event.preventDefault();
    this.props.addUserProperty({
      userID: this.props.auth.googleId,
      name: userName
    });
    this.setState({ editingName: false });
  };
  //end

  //phone handler
  handlePhoneEdit = () => {
    this.setState({ editingPhone: true });
  };
  handleSubmitPhone = event => {
    let phone = this.refs.phone.value;
    if (!phone) {
      this.setState({ editingPhone: false });
      return;
    }
    event.preventDefault();
    this.props.addUserProperty({
      userID: this.props.auth.googleId,
      phone: phone
    });
    this.setState({ editingPhone: false });
  };
  //end

  //address handler
  handleAddressEdit = () => {
    this.setState({ editingAddress: true });
  };
  handleSubmitAddress = event => {
    let address = this.refs.address.value;
    if (!address) {
      this.setState({ editingAddress: false });
      return;
    }
    event.preventDefault();
    this.props.addLocation({
      userID: this.props.auth.googleId,
      address: address
    });
    this.setState({ editingAddress: false });
  };
  //end

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="title" defaultValue={this.props.title} />
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    );
  }

  renderUserLocation() {
    const collectionClasses = ["collection"];
    collectionClasses.push(styles.Collection);
    const location = this.props.auth.location;
    const formatted_address = (
      <ul
        className={collectionClasses.join(" ")}
        key={location.formatted_address}
      >
        <li key={location.place_id} className="collection-item avatar">
          <i className="material-icons circle">my_location</i>
          <span className="title">Current location:</span>
          <p>{location.formatted_address}</p>
          <a href="#!" className="secondary-content">
            <i className="material-icons" onClick={this.handleAddressEdit}>
              mode_edit
            </i>
          </a>
        </li>
      </ul>
    );
    return formatted_address;
  }

  renderUserPhone() {
    const collectionClasses = ["collection"];
    collectionClasses.push(styles.Collection);
    const phone = this.props.auth.phone;
    const formatted_phone = (
      <ul className={collectionClasses.join(" ")}>
        <li className="collection-item avatar">
          <i className="material-icons circle">phone_iphone</i>
          <span className="title">Phone number:</span>
          <p>{phone}</p>
          <a href="#!" className="secondary-content">
            <i className="material-icons" onClick={this.handlePhoneEdit}>
              mode_edit
            </i>
          </a>
        </li>
      </ul>
    );
    return formatted_phone;
  }

  renderUserName() {
    const collectionClasses = ["collection"];
    collectionClasses.push(styles.Collection);
    const name = this.props.auth.name;
    const formatted_name = (
      <ul className={collectionClasses.join(" ")}>
        <li className="collection-item avatar">
          <i className="material-icons circle">phone_iphone</i>
          <span className="title">Your name:</span>
          <p>{name}</p>
          <a href="#!" className="secondary-content">
            <i className="material-icons" onClick={this.handleNameEdit}>
              mode_edit
            </i>
          </a>
        </li>
      </ul>
    );
    return formatted_name;
  }

  renderUserEmail() {
    const collectionClasses = ["collection"];
    collectionClasses.push(styles.Collection);
    const email = this.props.auth.emails[0][0]["value"];
    const formatted_email = (
      <ul className={collectionClasses.join(" ")}>
        <li className="collection-item avatar">
          <i className="material-icons circle">email</i>
          <span className="title">Your email:</span>
          <p>{email}</p>
        </li>
      </ul>
    );
    return formatted_email;
  }

  renderUserImage = () => {
    if (this.props.auth === null) {
      return (
        <div>
          <h2>Loading</h2>
        </div>
      );
    } else if (this.props.auth === false) {
      return (
        <div>
          <h2>Join us!</h2>
        </div>
      );
    } else if (this.props.auth) {
      return (
        <div className={styles.UserData}>
          <img src={this.props.auth.photos[0]} alt="userPhoto" />
          <FlatButton
            label="Choose an Image"
            labelPosition="before"
            style={style.uploadButton}
            containerElement="label"
          >
            <input
              type="file"
              style={style.uploadInput}
              ref="file"
              name="file"
              onChange={this.handleFileUpload}
            />
          </FlatButton>
        </div>
      );
    }
  };

  handleFileUpload = e => {
    e.preventDefault();
    const file = this.refs.file.files[0];
    // console.log(file);
    this.props.uploadData({ file: file, userID: this.props.auth.googleId });
  };

  render() {
    return (
      <div>
        {this.renderUserImage()}
        {this.renderDisplay()}
      </div>
    );
  }
}

const style = {
  uploadButton: {
    verticalAlign: "middle"
  },
  uploadInput: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    opacity: 0
  }
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {
  addUserProperty,
  addLocation,
  uploadData
})(UserEdit);
