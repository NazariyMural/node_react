import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logUserIn } from "../../../actions";
import LoginPage from "./LoginForm";
import { isEmpty, map } from "lodash";

import ReactModal from "react-modal";
import ModalContent from "./ModalContent/AvailableProduct";

import { getWaitList } from "../../../actions/waitListAction";
import styles from "./ModalContent/AvailableProduct.css";

export class LoginPageContainer extends Component {
  state = {
    showModal: false,
    redirect: false
  };

  componentDidMount() {
    if (this.props.auth) {
      this.props.getWaitList(this.props.auth.googleId).then(res => {
        this.renderWaitListNotification();
      });
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.auth !== this.props.auth) {
      console.log("componentWillReceiveProps");
      this.props.getWaitList(nextProps.auth.googleId).then(res => {
        this.renderWaitListNotification();
      });
    }
  }

  logUserInFunction = userData => {
    const { logUserIn } = this.props;
    logUserIn(userData);
  };

  //modal handler
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false, redirect: true });
  };

  renderWaitListNotification() {
    console.log("this.state.redirect");
    const { waitList } = this.props;
    let availableNow = 0;
    if (waitList) {
      if (!isEmpty(waitList.userWaitList)) {
        map(waitList.userWaitList, (product, key) => {
          if (!product.unavailable) availableNow++;
        });
      }
    }
    if (availableNow) {
      this.handleOpenModal();
    } else {
      this.setState({ redirect: true });
    }

    return null;
  }

  render() {
    const { auth } = this.props;
    console.log(this.state.redirect);
    if (auth === null) {
      return <section>Loading...</section>;
    }
    // if (auth) {
    //   if (auth.isLoggedIn) {
    //      return <Redirect to="/account" />;
    //   }
    // }
    if (this.state.redirect) {
      return <Redirect to="/account" />;
    }
    return (
      <div>
        <LoginPage loginFunction={this.logUserInFunction} />

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className={styles.Modal}
          overlayClassName={styles.Overlay}
          ariaHideApp={false}
        >
          <ModalContent handleCloseModal={this.handleCloseModal} />
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, waitList }) => {
  return { auth, waitList };
};

export default connect(mapStateToProps, { getWaitList, logUserIn })(
  LoginPageContainer
);
