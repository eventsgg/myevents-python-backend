import React, { Component } from 'react';
import styles from './Page.module.scss';
import Header from '../Header/Header';

class Page extends Component {
  render() {
    return (
      <div className={styles.page}>
        <Header></Header>
      </div>
    );
  }
}

export default Page;
