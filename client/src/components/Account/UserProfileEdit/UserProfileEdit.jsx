import React, { Component } from "react";
import styles from "./UserProfileEdit.css";
import { connect } from "react-redux";
// import map from "lodash/map";
import { addUserProperty } from "../../../actions/index";

class UserEdit extends Component {
  state = {
    editingPhone: false,
    editingAddress: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editingPhone) {
      this.refs.phone.focus();
    }
    if (this.state.editingAddress) {
      this.refs.address.focus();
    }
  }

  renderDisplay = () => {
    return (
      <div>
        <ul>
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
                  <span className={styles.UserDataItemText}>
                    Phone: {this.props.auth.phone}
                    <i
                      className="material-icons"
                      onClick={this.handlePhoneEdit}
                    >
                      mode_edit
                    </i>
                  </span>
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
              <span className={styles.userDataItem}>
                {this.props.auth.address ? (
                  <span className={styles.UserDataItemText}>
                    Location: {this.props.auth.address}
                    <i
                      className="material-icons"
                      onClick={this.handleAddressEdit}
                    >
                      mode_edit
                    </i>
                  </span>
                ) : (
                  <span className={styles.UserDataItemText}>
                    Add your address{" "}
                    <i
                      className="material-icons"
                      onClick={this.handleAddressEdit}
                    >
                      add_location
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
    this.props.addUserProperty({
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

  render() {
    return this.renderDisplay();
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { addUserProperty })(UserEdit);
