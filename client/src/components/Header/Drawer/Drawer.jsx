import React from "react";
import Drawer from "material-ui/Drawer";
import { NavLink } from "react-router-dom";
import styles from "./Drawer.css";

const drawer = ({ open, handleClose, handleToggle }) => {
  return (
    <div>
      <Drawer
        docked={false}
        width={200}
        open={open}
        onRequestChange={handleToggle}
      >
        <div className={styles.Link}>
          <div className={styles.LinkItem}>
            <NavLink
              to="/"
              onClick={handleClose}
              className={styles.LinkItemBrand}
            >
              <span className={styles.Brand}>Eliftech Market</span>
              <img
                src="https://i.pinimg.com/originals/ff/8b/7f/ff8b7fa437460c933d3d43a5e2d6cffe.jpg"
                alt="cool-logo"
                className={styles.LogoImg}
              />
            </NavLink>
          </div>
          <div className={styles.LinkItem}>
            <NavLink to="/store" onClick={handleClose}>
              Home
            </NavLink>
          </div>
          <div className={styles.LinkItem}>
            <NavLink to="/cart" onClick={handleClose}>
              Cart
            </NavLink>
          </div>

          <div className={styles.LinkItem}>
            <NavLink to="/compare" onClick={handleClose}>
              Compare
            </NavLink>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default drawer;
