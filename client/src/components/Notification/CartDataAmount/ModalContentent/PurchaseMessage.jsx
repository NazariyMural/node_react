import React from "react";
import styles from "./PurchaseMessage.css";

const addToWaitList = ({ handleCloseModal, message }) => {
  const classes = ["material-icons"];
  classes.push(styles.CloseIcon);
  if (!message) {
    message = "All products were successfully bought";
  }
  return (
    <div className={styles.ModalContent}>
      <h4>Thank you for buying our products.</h4>
      <span className={styles.Email}>{message}</span>
      <i className={classes.join(" ")} onClick={handleCloseModal}>
        close
      </i>
    </div>
  );
};
export default addToWaitList;
