import React from "react";
import styles from "./AddToWaitList.css";

const addToWaitList = ({ handleCloseModal, email }) => {
  const classes = ["material-icons"];
  classes.push(styles.CloseIcon);
  return (
    <div className={styles.ModalContent}>
      <h4>Thank you for your patience.</h4>
      <span>We will inform you as soon as this product will be available.</span>
      <span>
        <strong>On your email</strong>
      </span>
      <span className={styles.Email}>{email}</span>
      <i className={classes.join(" ")} onClick={handleCloseModal}>
        close
      </i>
    </div>
  );
};
export default addToWaitList;
