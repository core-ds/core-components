import { MouseEvent, RefObject } from 'react';

export type TBottomButton = {
    text: string;
    onClick: (e: MouseEvent) => void;
    /**
     * Задержка появления кнопки в ms
     */
    timeout?: number;
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
    bottomButton?: TBottomButton;
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
