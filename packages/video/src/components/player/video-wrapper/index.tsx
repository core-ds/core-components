import React, { forwardRef, type ReactNode } from 'react';

import styles from './index.module.css';

type Props = {
    children: ReactNode;
};

export const VideoWrapper = forwardRef<HTMLDivElement, Props>(({ children }, ref) => (
    <div className={styles.videoWrapper} ref={ref}>
        {children}
    </div>
));
