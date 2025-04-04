import React, { FC } from 'react';
import { SwipeableHandlers } from 'react-swipeable';
import { Backdrop, BackdropProps } from '@balafla/core-components-backdrop';

export type SwipeableBackdropProps = BackdropProps & {
    /**
     * Прозрачность бэкдропа
     */
    opacity?: number;

    /**
     * Обработчики свайпа
     */
    handlers?: SwipeableHandlers;

    /**
     * Время анимации opacity
     */
    opacityTimeout?: number;
};

export const SwipeableBackdrop: FC<SwipeableBackdropProps> = ({
    opacity,
    handlers,
    opacityTimeout,
    style,
    ...backdropProps
}) => (
    <div
        {...handlers}
        style={{
            opacity,
            transition: opacity === 1 ? `opacity ${opacityTimeout}ms ease-in-out` : '',
            position: 'relative',
            ...style,
        }}
    >
        <Backdrop {...backdropProps} />
    </div>
);
