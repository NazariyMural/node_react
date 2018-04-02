import React from "react";
import { Link } from "react-router-dom";
import styles from "./AvailableProduct.css";

const addToWaitList = ({ handleCloseModal }) => {
  return (
    <div className={styles.ModalContent}>
      <h4>Product on your wait list is available now.</h4>
      <span>Go to the Wait list</span>
      <Link to="/wait-list" onClick={handleCloseModal}>
        WaitList
      </Link>
      <button onClick={handleCloseModal}>Close Modal</button>
    </div>
  );
};
export default addToWaitList;
