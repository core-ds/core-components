import React, { forwardRef, type ReactNode, useContext } from 'react';

import { VideoContext } from '@alfalab/core-components-video/context';

import { SeekIndicator } from '../../controls/seek-indicator';

import styles from './index.module.css';

type Props = {
    children: ReactNode;
};

export const VideoWrapper = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
    const { seekIndicator } = useContext(VideoContext);

    return (
        <div className={styles.videoWrapper} ref={ref}>
            {children}
            <SeekIndicator
                amount={seekIndicator.amount}
                direction={seekIndicator.direction}
                visible={seekIndicator.visible}
            />
        </div>
    );
});
