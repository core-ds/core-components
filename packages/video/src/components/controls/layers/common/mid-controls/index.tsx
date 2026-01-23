/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Spinner } from '@alfalab/core-components-spinner';
import { VideoContext } from '@alfalab/core-components-video/context';
import { PauseCircleMIcon } from '@alfalab/icons-glyph/PauseCircleMIcon';
import { PlayCircleMIcon } from '@alfalab/icons-glyph/PlayCircleMIcon';

import styles from './index.module.css';

export const MidControls = () => {
    const { isLoading, isPaused, togglePause } = useContext(VideoContext);

    const PlayPauseContent = isPaused ? (
        <IconButton
            style={{ color: 'white', opacity: 0.7 }}
            size={56}
            icon={PlayCircleMIcon}
            onClick={() => togglePause(false)}
        />
    ) : (
        <IconButton
            style={{ color: 'white', opacity: 0.7 }}
            size={56}
            icon={PauseCircleMIcon}
            onClick={() => togglePause(true)}
        />
    );

    return (
        <div className={styles.midControls}>
            {isLoading && <Spinner preset={24} visible={true} colors='inverted' />}

            {!isLoading && PlayPauseContent}
        </div>
    );
};
