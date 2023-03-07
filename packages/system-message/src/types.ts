import { ReactNode } from 'react';

export type SystemMessageBaseProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Растянуть контент на всю доступную высоту.
     */
    fullHeight?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children: ReactNode;

    view: 'desktop' | 'mobile';
};

export type SystemMessageDesktopProps = Omit<SystemMessageBaseProps, 'view'>;

export type SystemMessageMobileProps = Omit<SystemMessageBaseProps, 'view'>;

export type SystemMessageResponsiveProps = Omit<SystemMessageBaseProps, 'view'> & {
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

export type TSystemMessageContext = Pick<
    SystemMessageBaseProps,
    'view' | 'dataTestId' | 'fullHeight'
>;
