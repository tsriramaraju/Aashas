import React from 'react';
import { AashasContact } from '../containers';
import AashasProfile from '../containers/aashas/aashasProfile';

import styles from '../sass/aashas.module.scss';
const Aashas = () => {
  return (
    <section className={styles.aashas}>
      <div style={{ height: '7vh' }} />
      <AashasProfile />
      <h2 className={styles.heading}>About</h2>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet, et mei ipsum molestie, cu illud minim
        commune eam. Quo case signiferumque eu. Ne everti moderatius ius, etiam
        assum ea quo. At eum wisi iracundia, probo blandit ut vis, habeo soluta
        tincidunt id cum. Qui no ipsum volutpat, meis epicuri ex mel. Eam
        nostrud urbanitas at. Ne dicta nullam salutatus eum, ne dolores fabellas
        nec. Cu illum inimicus mel. Ius elit eligendi vituperata ut. Facilis
        forensibus nam an, vix solet vocibus ei. Ei legere percipit sit. Sea
        fugit scribentur in, vim an inani propriae, has ea suas volumus. Et
        liber regione adversarium vis, ei odio libris consetetur sea. Id mei
        vero zril rationibus, no mea legimus constituto, mel everti accommodare
      </p>
      <div style={{ height: '2vh' }}></div>
      <AashasContact />
      <h2 className={styles.heading}>Articles</h2>
      <div className={styles.blog} style={{ backgroundColor: '#748CAB' }}>
        How to select wedding dress
      </div>
      <div style={{ height: '2vh' }}></div>
      <div className={styles.blog} style={{ backgroundColor: '#E63946' }}>
        How to select wedding dress
      </div>
      <div style={{ height: '10vh' }} />
    </section>
  );
};

export default Aashas;
