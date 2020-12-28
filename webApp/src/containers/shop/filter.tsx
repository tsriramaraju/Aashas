import React from 'react';
import { Chips } from '../../components/shared';
import styles from './filter.module.scss';
const Filter = () => {
  return (
    <div className={styles.container}>
      <Chips onClick={() => {}} text="Male" />
      <Chips onClick={() => {}} text="Female" />
      <Chips onClick={() => {}} text="Kids" />
      <Chips onClick={() => {}} text="Wedding" />
      <Chips onClick={() => {}} text="Party" />
      <Chips onClick={() => {}} text="Birthday" />
    </div>
  );
};

export default Filter;
