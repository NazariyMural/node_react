import React, { Component } from "react";
import styles from "./UserProfileEdit.css";
import { connect } from "react-redux";
import {
  addUserProperty,
  addLocation,
  uploadData
} from "../../../actions/userPropertyActions";

import FlatButton from "material-ui/FlatButton";
import ProfileDataItem from "./ProfileDataItem/ProfileDataItem";

class UserEdit extends Component {
  state = {
    editingPhone: false,
    editingAddress: false,
    editingName: false,
    editingCard: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editingPhone) {
      this.refs.editingPhone.focus();
    }
    if (this.state.editingAddress) {
      this.refs.editingAddress.focus();
    }
    if (this.state.editingCard) {
      this.refs.editingCard.focus();
    }
    if (this.state.editingName) {
      this.refs.editingName.focus();
    }
  }

  renderDisplay = () => {
    return (
      <div>
        <ul>
          <li>
            {this.state.editingName ? (
              <div>
                <form
                  onSubmit={this.handleEditSubmit}
                  id="editingName"
                  className={styles.Form}
                  name="fullName"
                >
                  <input
                    type="text"
                    ref="editingName"
                    placeholder="Enter Full Name"
                    className={styles.Input}
                  />
                  <div className={styles.FormBtn}>
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="btn waves-effect waves-light"
                      onClick={() => this.setState({ editingName: false })}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className={styles.UserDataItem}>
                {this.props.auth.fullName ? (
                  <div>
                    <ProfileDataItem
                      item={this.props.auth.fullName}
                      title="Your name:"
                      icon="account_circle"
                      id="editingName"
                      handlFormOpen={this.handlFormOpen}
                    />
                  </div>
                ) : null}
              </div>
            )}
          </li>

          <li>
            <div className={styles.UserDataItemText}>
              {this.renderUserEmail()}
            </div>
          </li>

          <li>
            {this.state.editingPhone ? (
              <form
                onSubmit={this.handleEditSubmit}
                id="editingPhone"
                className={styles.Form}
                name="phone"
              >
                <input
                  type="text"
                  ref="editingPhone"
                  placeholder="Enter phone number"
                  className={styles.Input}
                />
                <div className={styles.FormBtn}>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="btn waves-effect waves-light"
                    onClick={() => this.setState({ editingPhone: false })}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <span className={styles.UserDataItem}>
                {this.props.auth.phone ? (
                  <div className={styles.UserDataItemText}>
                    <ProfileDataItem
                      item={this.props.auth.phone}
                      title="Phone number:"
                      icon="phone_iphone"
                      id="editingPhone"
                      handlFormOpen={this.handlFormOpen}
                    />
                  </div>
                ) : (
                  <span className={styles.UserAddItemText}>
                    Add phone number{" "}
                    <i
                      id="editingPhone"
                      className="material-icons"
                      onClick={this.handlFormOpen}
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
              <form
                onSubmit={this.handleEditSubmit}
                id="editingAddress"
                className={styles.Form}
                name="address"
              >
                <input
                  type="text"
                  ref="editingAddress"
                  placeholder="Enter Your location"
                  className={styles.Input}
                />
                <div className={styles.FormBtn}>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="btn waves-effect waves-light"
                    onClick={() => this.setState({ editingAddress: false })}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.UserDataItem}>
                {this.props.auth.location ? (
                  <div>
                    <ProfileDataItem
                      item={this.props.auth.location.formatted_address}
                      title="Current location:"
                      icon="my_location"
                      id="editingAddress"
                      handlFormOpen={this.handlFormOpen}
                    />
                  </div>
                ) : (
                  <span className={styles.UserAddItemText}>
                    Add your address{" "}
                    <i
                      id="editingAddress"
                      className="material-icons"
                      onClick={this.handlFormOpen}
                    >
                      add_location
                    </i>
                  </span>
                )}
              </div>
            )}
          </li>

          <li>
            {this.state.editingCard ? (
              <form
                onSubmit={this.handleEditSubmit}
                id="editingCard"
                className={styles.Form}
                name="creditCard"
              >
                <input
                  type="text"
                  ref="editingCard"
                  placeholder="Enter credit card"
                  className={styles.Input}
                />
                <div className={styles.FormBtn}>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="btn waves-effect waves-light"
                    onClick={() => this.setState({ editingCard: false })}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <span className={styles.UserDataItem}>
                {this.props.auth.creditCard ? (
                  <div className={styles.UserDataItemText}>
                    <ProfileDataItem
                      item={this.props.auth.creditCard}
                      title="Card number:"
                      icon="credit_card"
                      id="editingCard"
                      handlFormOpen={this.handlFormOpen}
                    />
                  </div>
                ) : (
                  <span className={styles.UserAddItemText}>
                    Add your credit card{" "}
                    <i
                      className="material-icons"
                      id="editingCard"
                      onClick={this.handlFormOpen}
                    >
                      credit_card
                    </i>
                  </span>
                )}
              </span>
            )}
          </li>
        </ul>
      </div>
    );
  };

  handlFormOpen = e => {
    const currentEdit = e.target.id;
    this.setState({ [currentEdit]: true });
  };

  handleEditSubmit = event => {
    let target = event.target.id;
    let value = this.refs[target].value;
    let userProps = event.target.name;

    if (!value) {
      this.setState({ [target]: false });
      return;
    }
    event.preventDefault();
    if (target === "editingAddress") {
      this.props.addLocation({
        userID: this.props.auth.googleId,
        updateData: {
          [userProps]: value
        }
      });
    }
    this.props.addUserProperty({
      userID: this.props.auth.googleId,
      updateData: {
        [userProps]: value
      }
    });
    this.setState({ [target]: false });
  };

  renderUserEmail() {
    const collectionClasses = ["collection"];
    collectionClasses.push(styles.Collection);
    const email = this.props.auth.email;
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
          {this.props.auth.photo ? (
            <img src={this.props.auth.photo} alt="userPhoto" />
          ) : (
            <img
              src="http://www.energogreen.com/wp-content/uploads/2017/02/profile-icon-9-grey.png"
              alt="userPhoto"
            />
          )}
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
    this.props.uploadData({ file: file, userID: this.props.auth.googleId });
  };

  render() {
    return (
      <div className={styles.UserProfileContent}>
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
