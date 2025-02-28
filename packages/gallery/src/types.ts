import { MouseEvent, RefObject } from 'react';

type BottomButton = {
    text: string;
    onClick: (e: MouseEvent) => void;
};

export type GalleryImage = {
    src: string;
    name?: string;
    previewSrc?: string;
    alt?: string;
    canDownload?: boolean;
    /**
     * Нижняя кнопка, есть только у видео
     */
    bottomButton?: BottomButton;
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
