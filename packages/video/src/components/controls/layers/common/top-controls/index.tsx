import React from 'react';

import styles from './index.module.css';

export const TopControls = ({ videoName }: { videoName?: string }) => (
    <div className={styles.topControls}>{videoName}</div>
);
