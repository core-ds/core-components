import React, { useContext } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

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

    return (
        <div
            className={cn(styles.headerMobile, {
                [styles.video]: isVideo(currentImage?.src),
                [styles.hide]: hideNavigation,
            })}
        >
            <Buttons.BackArrow onClick={onClose} />
            <Typography.Text
                className={styles.description}
                tag='div'
                view='component-primary'
                color='static-primary-light'
            >
                {description}
            </Typography.Text>
            <div className={styles.rightButtons}>
                {showDownloadButton && (
                    <Buttons.Download
                        href={currentImage?.src}
                        download={currentImage?.name}
                        dataTestId={TestIds.DOWNLOAD_BUTTON}
                    />
                )}
            </div>
        </div>
    );
};
