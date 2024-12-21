import { type ReactNode } from 'react';

import { PaddingType } from '../../types';

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
     * Идентификатор для систем автоматизированного тестирования.
     * Для слотов используются одноименные модификаторы (-graphic, -title и тд)
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children: ReactNode;

    /**
     * Отступы.
     */
    padding?: PaddingType;

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
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     * @deprecated Используйте client
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export type TSystemMessageContext = Pick<
    SystemMessageBaseProps,
    'view' | 'dataTestId' | 'fullHeight'
>;
