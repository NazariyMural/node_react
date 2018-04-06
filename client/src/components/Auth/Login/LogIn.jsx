import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { isEmpty, filter } from "lodash";
import ReactModal from "react-modal";
import { logUserIn } from "../../../actions/userAuthActions";
import { getWaitList } from "../../../actions/waitListActions";
import LoginPage from "./LoginForm";
import ModalContent from "./ModalContent/AvailableProduct";
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.auth === this.props.auth;
  // }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.auth !== this.props.auth) {
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
    const { waitList } = this.props;
    if (waitList) {
      let availableNow = [];
      if (!isEmpty(waitList.userWaitList)) {
        availableNow = filter(waitList.userWaitList, product => {
          if (!product.unavailable) return product;
        });
      }
      if (availableNow.length) {
        this.handleOpenModal();
      } else {
        this.setState({ redirect: true });
      }
    }
    return null;
  }

  render() {
    const { auth } = this.props;
    if (auth === null) {
      return <section>Loading...</section>;
    }
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
