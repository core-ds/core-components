import { type RefObject } from 'react';

import { type BaseModalProps } from '@alfalab/core-components-base-modal';

import { type TMargin } from '../../typings/margin-type';

export interface BaseUniversalModalProps {
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
     * fullHeight - высота модального окна подстроится под viewport (по умолчанию для боковой модалки)
     * hugContent - высота модального окна зафиксируется под размер содержимого (по умолчания для центральной модалки)
     * minHeight - 264
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
}

export interface UniversalModalDesktopProps
    extends BaseUniversalModalProps,
        Pick<BaseModalProps, 'open'>,
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
                | 'disableBackdropClick'
                | 'onClose'
            >
        > {
    /**
     * Реф контейнера на котором происходит scroll
     */
    scrollableContainerRef?: RefObject<HTMLDivElement>;
}
