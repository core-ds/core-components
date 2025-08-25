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
        if (!currentImage || !navigator.share) {
            return;
        }

        const title = currentImage.name ?? new Date().toISOString().split('T')[0];
        const url = currentImage.src;

        try {
            if (isVideo(url)) {
                // Если видео — всегда делим ссылку
                await navigator.share({
                    title,
                    url,
                    text: 'Видео',
                });

                return;
            }

            // Попробуем скачать изображение
            const response = await fetch(url, { mode: 'cors' });
            const blob = await response.blob();

            const file = new File([blob], `${title}.png`, {
                type: blob.type,
                lastModified: Date.now(),
            });

            const shareData: ShareData = {
                files: [file],
                title,
                text: 'Картинка',
            };

            // Попробуем поделиться файлом
            if (navigator.canShare?.(shareData) && response.ok) {
                await navigator.share(shareData);
            } else {
                // Fallback: делимся только ссылкой
                await navigator.share({
                    title,
                    text: 'Картинка',
                    url,
                });
            }
        } catch {
            await navigator.share({
                title,
                url,
            });
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
