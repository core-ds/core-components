import { RefObject } from 'react';

export type GalleryImage = {
    src: string;
    name?: string;
    previewSrc?: string;
    alt?: string;
    canDownload?: boolean;
};

export type ImageMeta =
    | {
          width: number;
          height: number;
          broken?: boolean;
          player?: never;
      }
    | {
          width?: never;
          height?: never;
          broken?: boolean;
          player: RefObject<HTMLVideoElement>;
      };
