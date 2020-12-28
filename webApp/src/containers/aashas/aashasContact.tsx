import React from 'react';
import styles from './aashasContact.module.scss';
const AashasContact = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactDetails}>
        <div className={styles.contactDetail}>
          <h3 className={styles.contactHeading}>Address</h3>
          <p className={styles.contactText}>
            House #2, baltimore, roadno.3, Srikakulam
          </p>
        </div>
        <div className={styles.contactDetail}>
          <h3 className={styles.contactHeading}>Timmings</h3>
          <p className={styles.contactText}>monday-friday open till 7PM</p>
        </div>
      </div>

      <div className={styles.mapContainer}></div>
    </div>
  );
};

export { AashasContact };
