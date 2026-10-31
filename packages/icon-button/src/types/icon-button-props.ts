import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ElementType,
    type ReactElement,
} from 'react';

import { type BaseButtonCustomProps } from '@alfalab/core-components-button/shared';

export interface IconButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
        Pick<BaseButtonCustomProps, 'Component' | 'loading'>,
        Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'download'> {
    /**
     * Выводит ссылку в виде кнопки
     */
    href?: string;
    /**
     * Компонент иконки
     */
    icon: ElementType<{ className?: string }> | ReactElement<{ className?: string }>;

    /**
     * Тип кнопки
     */
    view?: 'primary' | 'secondary' | 'transparent' | 'tertiary' | 'negative';

    /**
     * Размер компонента
     * @default 48
     */
    size?: 24 | 32 | 40 | 48 | 56;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Включает прозрачный фон
     * @default false
     */
    transparentBg?: boolean;

    /**
     * Выравнивание иконки
     * @default 'center'
     */
    alignIcon?: 'left' | 'center' | 'right';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
}
