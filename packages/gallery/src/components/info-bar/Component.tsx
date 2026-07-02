import React, { useCallback, useContext } from 'react';
import cn from 'classnames';

import { TypographyText } from '@alfalab/core-components-typography';

import { GalleryContext } from '../../context';
import { isVideo } from '../../utils';
import * as Buttons from '../buttons';

import { formatDate } from './utils';

import styles from './index.module.css';

export const InfoBar = () => {
    const { getCurrentImage, mutedVideo, setMutedVideo, playingVideo, setPlayingVideo } =
        useContext(GalleryContext);

    const image = getCurrentImage();
    const createdAt = formatDate(image?.createdAt ?? '');

    const handleMuteVideo = useCallback(() => {
        if (image) {
            if (mutedVideo && image.onUnmute) {
                image.onUnmute();
            } else if (image.onMute) {
                image.onMute();
            }
        }
        setMutedVideo(!mutedVideo);
    }, [image, mutedVideo, setMutedVideo]);

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
            <div className={styles.infoBlock}>
                <TypographyText
                    className={styles.description}
                    tag='div'
                    view='component-primary'
                    color='static-primary-light'
                >
                    {image?.name}
                </TypographyText>
                {image?.createdAt && (
                    <TypographyText
                        className={styles.description}
                        tag='div'
                        view='primary-small'
                        color='secondary-inverted'
                    >
                        {createdAt}
                    </TypographyText>
                )}
            </div>
            {mutedVideo ? (
                <Buttons.UnmuteVideo onClick={handleMuteVideo} />
            ) : (
                <Buttons.MuteVideo onClick={handleMuteVideo} />
            )}
        </section>
    ) : (
        <section className={cn(styles.infoWrapper, styles.infoBlock)}>
            <TypographyText
                className={styles.description}
                tag='div'
                view='component-primary'
                color='static-primary-light'
            >
                {image?.name}
            </TypographyText>
            {image?.createdAt && (
                <TypographyText
                    className={styles.description}
                    tag='div'
                    view='primary-small'
                    color='secondary-inverted'
                >
                    {createdAt}
                </TypographyText>
            )}
        </section>
    );
};
