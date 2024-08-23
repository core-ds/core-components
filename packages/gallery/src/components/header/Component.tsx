import React, { FC, useContext, useEffect, useRef } from 'react';

import { GalleryContext } from '../../context';
import { isSmallImage, isVideo, TestIds } from '../../utils';
import * as Buttons from '../buttons';
import { HeaderInfoBlock } from '../header-info-block';

import styles from './index.module.css';

export const Header: FC = () => {
    const {
        currentSlideIndex,
        singleSlide,
        images,
        fullScreen,
        getCurrentImageMeta,
        getCurrentImage,
        setFullScreen,
        onClose,
        mutedVideo,
        setMutedVideo,
    } = useContext(GalleryContext);

    const currentImage = getCurrentImage();
    const meta = getCurrentImageMeta();

    const toggleFullScreenButton = useRef<HTMLButtonElement>(null);

    const onMuteButtonClick = () => {
        setMutedVideo(!mutedVideo);
    };

    const closeFullScreen = () => {
        setFullScreen(false);
    };

    const openFullScreen = () => {
        setFullScreen(true);
    };

    useEffect(() => {
        if (toggleFullScreenButton.current) {
            toggleFullScreenButton.current.focus();
        }
    }, [fullScreen]);

    const canDownload = currentImage?.canDownload ?? true;
    const filename = currentImage?.name || '';
    const description =
        singleSlide || !images.length ? '' : `${currentSlideIndex + 1} из ${images.length}`;

    const showFullScreenButton = !isSmallImage(meta) && !meta?.broken;
    const showDownloadButton = !meta?.broken && canDownload;

    const renderToggleFullScreenButton = () =>
        fullScreen ? (
            <Buttons.ExitFullscreen
                onClick={closeFullScreen}
                buttonRef={toggleFullScreenButton}
                dataTestId={TestIds.EXIT_FULLSCREEN_BUTTON}
            />
        ) : (
            <Buttons.Fullscreen
                onClick={openFullScreen}
                buttonRef={toggleFullScreenButton}
                dataTestId={TestIds.FULLSCREEN_BUTTON}
            />
        );

    const renderToggleMuteVideo = () =>
        mutedVideo ? (
            <Buttons.UnmuteVideo onClick={onMuteButtonClick} dataTestId={TestIds.UNMUTE_BUTTON} />
        ) : (
            <Buttons.MuteVideo onClick={onMuteButtonClick} dataTestId={TestIds.MUTE_BUTTON} />
        );

    return (
        <div className={styles.header}>
            <HeaderInfoBlock filename={filename} description={description} />

            <div className={styles.buttons}>
                {isVideo(currentImage?.src) && renderToggleMuteVideo()}
                {showFullScreenButton && renderToggleFullScreenButton()}

                {showDownloadButton && (
                    <Buttons.Download
                        href={currentImage?.src}
                        download={currentImage?.name}
                        dataTestId={TestIds.DOWNLOAD_BUTTON}
                    />
                )}

                <Buttons.Exit onClick={onClose} dataTestId={TestIds.CLOSE_BUTTON} />
            </div>
        </div>
    );
};
