import React, { useContext } from 'react';
import cn from 'classnames';

import { Text } from '@alfalab/core-components-typography';

import { GalleryContext } from '../../context';
import { isVideo, TestIds } from '../../utils';
import * as Buttons from '../buttons';

import styles from './index.module.css';

export const HeaderMobile = () => {
    const {
        onClose,
        images,
        currentSlideIndex,
        getCurrentImage,
        getCurrentImageMeta,
        hideNavigation,
    } = useContext(GalleryContext);

    const currentImage = getCurrentImage();
    const meta = getCurrentImageMeta();

    const description = images.length > 1 && `${currentSlideIndex + 1} из ${images.length}`;

    const canDownload = currentImage?.canDownload ?? true;
    const showDownloadButton = !meta?.broken && canDownload;

    const handleShareClick = async () => {
        if (!currentImage) return;

        const title = currentImage.name ?? new Date().toISOString().split('T')[0];

        const image = await fetch(currentImage.src);
        const blob = await image.blob();

        const filesArray = [
            new File([blob], title, {
                type: blob.type,
                lastModified: new Date().getTime(),
            }),
        ];

        const shareData = {
            files: filesArray,
        };

        if (navigator.canShare(shareData) && !isVideo(currentImage.src)) {
            await navigator.share(shareData);
        } else {
            await navigator.share({ url: currentImage.src, title });
        }
    };

    return (
        <div
            className={cn(styles.headerMobile, {
                [styles.video]: isVideo(currentImage?.src),
                [styles.hide]: hideNavigation,
            })}
        >
            <Buttons.BackArrow onClick={onClose} />
            <Text
                className={styles.description}
                tag='div'
                view='component-primary'
                color='static-primary-light'
            >
                {description}
            </Text>
            <div className={styles.rightButtons}>
                {showDownloadButton && (
                    <Buttons.Download
                        href={currentImage?.src}
                        download={currentImage?.name}
                        dataTestId={TestIds.DOWNLOAD_BUTTON}
                    />
                )}
                {!meta?.broken && <Buttons.Share onClick={handleShareClick} />}
            </div>
        </div>
    );
};
