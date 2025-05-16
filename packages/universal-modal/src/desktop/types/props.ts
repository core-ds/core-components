import type { RefObject } from 'react';

import { BaseModalProps } from '@alfalab/core-components-base-modal';

import { TMargin } from '../../typings/margin-type';

export type BaseUniversalModalProps = {
    /**
     * Расположение по горизонтали и сторона с которой модал “выезжает” при открытии
     * @default center
     */
    horizontalAlign?: 'start' | 'center' | 'end';

    /**
     * Расположение модального окна по вертикали
     * @default center
     */
    verticalAlign?: 'top' | 'center' | 'bottom';

    /**
     * Ширина модального окна
     * fullWidth - ширина модального окна подстроится под viewport
     * minWidth - 500
     * @default 500
     */
    width?: number | 'fullWidth';

    /**
     * Высота модального окна
     * fullHeight - высота модального окна подстроится под viewport
     * hugContent - высота модального окна зафиксируется под размер содержимого
     * minHeight - 264
     * @default fullHeight
     */
    height?: number | 'fullHeight' | 'hugContent';

    /**
     * Наличие оверлея
     * @default true
     */
    overlay?: boolean;

    /**
     * Устанавливает отступы модального окна
     */
    margin?: TMargin;

    /**
     * Хэндлер закрытия модалки
     */
    onClose?: () => void;
};

export type UniversalModalDesktopProps = BaseUniversalModalProps &
    Pick<BaseModalProps, 'open'> &
    Partial<
        Pick<
            BaseModalProps,
            | 'children'
            | 'dataTestId'
            | 'className'
            | 'wrapperClassName'
            | 'onUnmount'
            | 'transitionProps'
            | 'backdropProps'
        >
    > & {
        /**
         * Реф контейнера на котором происходит scroll
         */
        scrollableContainerRef?: RefObject<HTMLDivElement>;
    };
