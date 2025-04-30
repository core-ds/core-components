import { ReactNode } from 'react';

import type { BaseModalProps } from '@alfalab/core-components-base-modal';

export type ModalDesktopProps = BaseModalProps & {
    /**
     * Ширина модального окна
     * @default 600
     */
    size?: 'fullscreen' | 500 | 600 | 800 | 1140;

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

    /**
     * Блокирует скролл когда модальное окно открыто. Работает только на iOS.
     */
    iOSLock?: boolean;
};

export type ModalMobileProps = Omit<ModalDesktopProps, 'size' | 'fixedPosition'>;

export type ModalResponsiveProps = ModalDesktopProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     * @deprecated Используйте client
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export type View = 'desktop' | 'mobile';

export type TResponsiveModalContext = {
    view: View;
    size: NonNullable<ModalDesktopProps['size']>;
    dataTestId?: string;
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
