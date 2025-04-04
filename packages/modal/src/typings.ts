import { ReactNode } from 'react';
import type { BaseModalProps } from '@balafla/core-components-base-modal';

export type ModalDesktopProps = BaseModalProps & {
    /**
     * Ширина модального окна
     * @default 600
     * @description s, m, l, xl deprecated, используйте вместо них 500, 600, 800, 1140 соответственно
     */
    size?: 's' | 'm' | 'l' | 'xl' | 'fullscreen' | 500 | 600 | 800 | 1140;

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

    /**
     * Блокирует скролл когда модальное окно открыто. Работает только на iOS.
     */
    iOSLock?: boolean;
};

export type ModalMobileProps = Omit<ModalDesktopProps, 'size' | 'fixedPosition' | 'fullscreen'>;

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
