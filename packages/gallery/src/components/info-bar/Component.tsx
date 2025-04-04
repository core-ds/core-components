import React, { useCallback, useContext } from 'react';
import { Text } from '@balafla/core-components-typography';

import { GalleryContext } from '../../context';
import { GALLERY_EVENTS, isVideo } from '../../utils';
import * as Buttons from '../buttons';

import styles from './index.module.css';

export const InfoBar = () => {
    const {
        getCurrentImage,
        mutedVideo,
        setMutedVideo,
        playingVideo,
        setPlayingVideo,
        getCurrentImageMeta,
    } = useContext(GalleryContext);

    const image = getCurrentImage();
    const meta = getCurrentImageMeta();

    const handleMuteVideo = useCallback(() => {
        if (mutedVideo) {
            const customEvent = new CustomEvent(GALLERY_EVENTS.ON_UNMUTE, {
                detail: { player: meta?.player?.current },
            });

            dispatchEvent(customEvent);
        } else {
            const customEvent = new CustomEvent(GALLERY_EVENTS.ON_MUTE, {
                detail: { player: meta?.player?.current },
            });

            dispatchEvent(customEvent);
        }
        setMutedVideo(!mutedVideo);
    }, [meta?.player, mutedVideo, setMutedVideo]);

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
        <Text
            className={styles.description}
            tag='div'
            view='component'
            color='static-primary-light'
        >
            {image?.name}
        </Text>
    );
};
