import { ReactNode } from 'react';

import type { BaseModalProps } from '@alfalab/core-components-base-modal';

export type ModalDesktopProps = BaseModalProps & {
    /**
     * Ширина модального окна
     * @default "m"
     */
    size?: 's' | 'm' | 'l' | 'xl' | 'fullscreen';

    /**
     * Растягивает модальное окно на весь экран
     * @deprecated Используйте размер fullscreen
     */
    fullscreen?: boolean;

    /**
     * Фиксирует позицию модального окна после открытия,
     * предотвращая скачки, если контент внутри будет меняться
     */
    fixedPosition?: boolean;

    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;
};

export type ModalMobileProps = Omit<ModalDesktopProps, 'size' | 'fixedPosition' | 'fullscreen'>;

export type ModalResponsiveProps = ModalDesktopProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export type View = 'desktop' | 'mobile';

export type TResponsiveModalContext = {
    view: View;
    size: NonNullable<ModalDesktopProps['size']>;
};

export type ContentProps = {
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Растягивает контент на всю высоту
     */
    flex?: boolean;
};
