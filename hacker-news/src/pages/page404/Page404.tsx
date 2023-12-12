import React from "react";
import { Link } from "react-router-dom";
import styles from "./page404.module.css";

export default class Page404 extends React.Component {
  render() {
    return (
      <div className={styles.page404}>
        <div className={styles.container}>
          <h2>Uups! This page not exist!</h2>
          <Link to={"/"}>Go home</Link>
        </div>
      </div>
    );
  }
}
