import React from 'react';

import errorIcon from '../../../assets/error.svg';

import styles from './index.module.css';

export const VideoError = () => (
    <div className={styles.error}>
        <img src={errorIcon} alt='error' />
    </div>
);
