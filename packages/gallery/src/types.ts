import { type MouseEvent, type RefObject } from 'react';

export type TBottomButton = {
    text: string;
    onClick: (e: MouseEvent) => void;
    /**
     * Задержка появления кнопки в s
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
    /**
     * Callback при нажатии на кнопку Play, есть только у видео
     */
    onPlay?: () => void;
    /**
     * Callback при нажатии на кнопку Pause, есть только у видео
     */
    onPause?: () => void;
    /**
     * Callback при нажатии на кнопку Mute, есть только у видео
     */
    onMute?: () => void;
    /**
     * Callback при нажатии на кнопку Unmute, есть только у видео
     */
    onUnmute?: () => void;
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
