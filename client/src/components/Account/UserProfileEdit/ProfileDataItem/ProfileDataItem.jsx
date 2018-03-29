import React from "react";
import styles from "../UserProfileEdit.css";

const profileDataItem = ({ item, title, icon, id, handlFormOpen }) => {
  const collectionClasses = ["collection"];
  collectionClasses.push(styles.Collection);

  return (
    <ul className={collectionClasses.join(" ")}>
      <li className="collection-item avatar">
        <i className="material-icons circle">{icon}</i>
        <span className="title">{title}</span>
        <p>{item}</p>
        <a href="#!" className="secondary-content">
          <i className="material-icons" id={id} onClick={handlFormOpen}>
            mode_edit
          </i>
        </a>
      </li>
    </ul>
  );
};

export default profileDataItem;
