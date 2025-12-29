import React, { useContext } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import { GalleryContext } from '../../context';
import { useCustomSubtitles } from '../../hooks';

import styles from './index.module.css';

export const Subtitles = () => {
    const { view } = useContext(GalleryContext);

    const { showSub, currentSub } = useCustomSubtitles();

    if (showSub) {
        return (
            <Typography.Text
                className={cn(styles.subtitles, {
                    [styles.hideSubtitles]: !showSub,
                    [styles.mobile]: view === 'mobile',
                })}
                color='static-primary-light'
            >
                {currentSub}
            </Typography.Text>
        );
    }

    return null;
};
