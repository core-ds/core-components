import { type CSSProperties, type ReactNode } from 'react';
import { type AnimationDirection } from 'lottie-web/build/player/lottie_light';

export enum LottieDataState {
    OK,
    ERROR,
    LOADING,
    INITIAL,
}

export interface LottieProps {
    /**
     * Воспроизводится ли анимация
     */
    play?: boolean;
    /**
     * Скорость воспроизведения анимации
     */
    speed?: number;
    /**
     * Начальный кадр воспроизведения анимации
     */
    initialFrame?: number;
    /**
     * Стартовый кадр воспроизведения анимации
     */
    startFrame?: number;
    /**
     * Конечный кадр воспроизведения анимации
     */
    endFrame?: number;
    /**
     * Число итераций
     */
    iterations?: number;
    /**
     * Направление воспроизведения анимации
     */
    direction?: AnimationDirection | 'reverseOnRepeat';
    /**
     * Источник анимации
     */
    animation: { path: string; data?: never } | { path?: never; data: unknown };
    /**
     * Плейсхолдер анимации
     */
    placeholder?: (dataState: LottieDataState.LOADING | LottieDataState.ERROR) => ReactNode;
    /**
     * Режим масштабирования анимации
     */
    scale?: 'fit' | 'fill';
    /**
     * Размер анимации
     */
    size?: Pick<
        CSSProperties,
        'width' | 'height' | 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight'
    >;
    /**
     * Дополнительный класс
     */
    className?: string;
}

export type { AnimationDirection };

export interface LottieEvents {
    started: () => void;
    ended: () => void;
    stopped: () => void;
    resumed: () => void;
    frame: (data: { currentFrame: number }) => void;
}

export interface LottieRef {
    reset(): void;
    subscribe<T extends keyof LottieEvents>(name: T, callback: LottieEvents[T]): () => void;
}
