import React, { useCallback, useContext } from 'react';

import { isVideo } from '@alfalab/core-components-gallery';
import { Typography } from '@alfalab/core-components-typography';

import { GalleryContext } from '../../context';
import * as Buttons from '../buttons';

import styles from './index.module.css';

export const InfoBar = () => {
    const { getCurrentImage, mutedVideo, setMutedVideo, playingVideo, setPlayingVideo } =
        useContext(GalleryContext);

    const image = getCurrentImage();

    const handleMuteVideo = useCallback(() => {
        setMutedVideo(!mutedVideo);
    }, [mutedVideo, setMutedVideo]);

    const handlePlayVideo = useCallback(() => {
        setPlayingVideo(!playingVideo);
    }, [playingVideo, setPlayingVideo]);

    return isVideo(image?.src) ? (
        <section className={styles.videoButtons}>
            {playingVideo ? (
                <Buttons.Pause onClick={handlePlayVideo} className={styles.center} />
            ) : (
                <Buttons.Play onClick={handlePlayVideo} className={styles.center} />
            )}
            {mutedVideo ? (
                <Buttons.UnmuteVideo onClick={handleMuteVideo} className={styles.right} />
            ) : (
                <Buttons.MuteVideo onClick={handleMuteVideo} className={styles.right} />
            )}
        </section>
    ) : (
        <Typography.Text
            className={styles.description}
            tag='div'
            view='component'
            color='primary-inverted'
        >
            {image?.name}
        </Typography.Text>
    );
};
