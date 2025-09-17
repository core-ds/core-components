import { type GalleryImage, type ImageMeta } from '../types';

export const PLACEHOLDER_WIDTH = 400;
export const PLACEHOLDER_HEIGHT = 300;

export const getImageKey = ({ name = '', src }: GalleryImage, index: number): string =>
    `${name}-${index}-${src}`;

export const getImageAlt = ({ alt, name }: GalleryImage, index: number): string =>
    alt || name || `Изображение ${index + 1}`;

export const isSmallImage = (meta?: ImageMeta) => {
    if (meta?.width && meta.height) {
        return meta.width < PLACEHOLDER_WIDTH && meta.height < PLACEHOLDER_HEIGHT;
    }

    return false;
};

export const isVideo = (url: string | undefined) =>
    ['.webm', '.mp4', '.m3u8'].some((item) => url?.endsWith(item));
