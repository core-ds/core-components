import { type CSSProperties, type ReactNode } from 'react';
import {
    type AnimationDirection,
    type AnimationEventCallback,
    type AnimationEventName,
    type AnimationEvents,
    type AnimationItem,
} from 'lottie-web/build/player/lottie_light';

export enum LottieDataState {
    OK,
    ERROR,
    LOADING,
    INITIAL,
}

export interface LottieProps {
    /**
     * Воспроизводится ли анимация
     * @default true
     */
    play?: boolean;
    /**
     * Обработчик изменения воспроизведения
     */
    onPlayChange?: (nextPlay: boolean) => void;
    /**
     * Обработчик завершения анимации
     */
    onComplete?: () => void;
    /**
     * Скорость воспроизведения анимации
     */
    speed?: number;
    /**
     * Начальный кадр воспроизведения анимации
     */
    startFrame?: number;
    /**
     * Конечный кадр воспроизведения анимации
     */
    endFrame?: number;
    /**
     * Обработчик изменения кадра
     */
    onFrameChange?: (nextFrame: number) => void;
    /**
     * Число итераций. 0 - бесконечное число итераций
     * @default 0
     */
    iterations?: number;
    /**
     * Обработчик изменения итерации
     */
    onIterationChange?: (nextIteration: number) => void;
    /**
     * Направление воспроизведения анимации
     */
    direction?: AnimationDirection;
    /**
     * Источник анимации
     */
    src?: string;
    /**
     * Анимация
     */
    data?: unknown;
    /**
     * Плейсхолдер анимации
     */
    placeholder?: (dataState: LottieDataState.LOADING | LottieDataState.ERROR) => ReactNode;
    /**
     * Режим масштабирования анимации
     * @default fill
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

export interface AnimationData {
    /**
     * In point - начальный кадр анимации
     */
    ip: number;
    /**
     * Out point - конечный кадр анимации
     */
    op: number;
}

export interface LottieAnimationItem extends AnimationItem {
    _cbs?: unknown[] & {
        [P in AnimationEventName]?: Array<AnimationEventCallback<AnimationEvents[P]>>;
    };
    animationData?: AnimationData;
}
