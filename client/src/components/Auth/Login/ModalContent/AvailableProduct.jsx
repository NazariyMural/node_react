import React from "react";
import { Link } from "react-router-dom";
import styles from "./AvailableProduct.css";

const addToWaitList = ({ handleCloseModal }) => {
  const classes = ["material-icons"];
  classes.push(styles.CloseIcon);
  return (
    <div className={styles.ModalContent}>
      <h4>Product on your wait list is available now.</h4>
      <span>Go to the Wait list</span>
      <Link
        to="/wait-list"
        className="btn grey darken-4"
        onClick={handleCloseModal}
      >
        <i className="material-icons left">access_time</i>
        WaitList
      </Link>
      <i className={classes.join(" ")} onClick={handleCloseModal}>
        close
      </i>
    </div>
  );
};
export default addToWaitList;
