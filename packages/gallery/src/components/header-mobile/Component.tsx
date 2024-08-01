import React, { useContext } from 'react';

import { TestIds } from '@alfalab/core-components-gallery';
import { Typography } from '@alfalab/core-components-typography';

import { GalleryContext } from '../../context';
import * as Buttons from '../buttons';

import styles from './index.module.css';

export const HeaderMobile = () => {
    const {
        onClose,
        singleSlide,
        images,
        currentSlideIndex,
        getCurrentImage,
        getCurrentImageMeta,
    } = useContext(GalleryContext);

    const currentImage = getCurrentImage();
    const meta = getCurrentImageMeta();

    const description =
        singleSlide || !images.length ? '' : `${currentSlideIndex + 1} из ${images.length}`;

    const canDownload = currentImage?.canDownload ?? true;
    const showDownloadButton = !meta?.broken && canDownload;

    return (
        <div className={styles.headerMobile}>
            <Buttons.BackArrow onClick={onClose} />
            <Typography.Text
                className={styles.description}
                tag='div'
                view='component'
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
