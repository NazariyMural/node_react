import React from "react";
import styles from "./AddToWaitList.css";

const addToWaitList = ({ handleCloseModal }) => {
  return (
    <div className={styles.ModalContent}>
      <h4>Thank you for your patience.</h4>
      <span>We will inform you as this product will be available.</span>
      <button onClick={handleCloseModal}>Close Modal</button>
    </div>
  );
};
export default addToWaitList;
