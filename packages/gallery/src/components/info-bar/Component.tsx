import React, { useCallback, useContext } from 'react';
import cn from 'classnames';

import { Text } from '@alfalab/core-components-typography';

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
        const eventType = mutedVideo ? GALLERY_EVENTS.ON_UNMUTE : GALLERY_EVENTS.ON_MUTE;
        const customEvent = new CustomEvent(eventType, {
            detail: { player: meta?.player?.current },
        });

        dispatchEvent(customEvent);
        setMutedVideo(!mutedVideo);
    }, [meta?.player, mutedVideo, setMutedVideo]);

    const handlePlayVideo = useCallback(() => {
        setPlayingVideo(!playingVideo);
    }, [playingVideo, setPlayingVideo]);

    return isVideo(image?.src) ? (
        <section className={cn(styles.infoWrapper, styles.video)}>
            {playingVideo ? (
                <Buttons.Pause onClick={handlePlayVideo} />
            ) : (
                <Buttons.Play onClick={handlePlayVideo} />
            )}
            <Text
                className={styles.description}
                tag='div'
                view='component'
                color='static-primary-light'
            >
                {image?.name}
            </Text>
            {mutedVideo ? (
                <Buttons.UnmuteVideo onClick={handleMuteVideo} />
            ) : (
                <Buttons.MuteVideo onClick={handleMuteVideo} />
            )}
        </section>
    ) : (
        <section className={styles.infoWrapper}>
            <Text
                className={styles.description}
                tag='div'
                view='component'
                color='static-primary-light'
            >
                {image?.name}
            </Text>
        </section>
    );
};
