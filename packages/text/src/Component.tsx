import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import { TypographyType } from '@alfalab/core-components-types';

import styles from './index.module.css';
import mixin from './mixin.module.css';

export interface TextProps {
    /**
     * HTML тег
     */
    tag?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    /**
     * Cтиль типографики
     */
    view?: TypographyType;

    /**
     * Выравнивание текста
     * @default left
     */
    align?: 'left' | 'center' | 'right';

    /**
     * Цвет текста
     */
    color?: string;

    /**
     * Цвет фона
     */
    textBackgroundColor?: string;

    /**
     * Количество строк
     */
    rowLimit?: 1 | 2 | 3;

    /**
     * Делает цифры моноширинными
     */
    monospaceNumbers?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дочерние элементы
     */
    children?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     */
    dataTestId?: string;
}
export const Text: FC<TextProps> = ({
    tag: Component = 'span',
    align = 'left',
    rowLimit,
    view = 'paragraph-primary-medium',
    monospaceNumbers = false,
    color,
    textBackgroundColor,
    className,
    children,
    dataTestId,
}) => (
    <Component
        className={cn(
            styles.component,
            styles[align],
            mixin[view],
            {
                [styles[`row-limit-${rowLimit}`]]: rowLimit,
                [styles.monospace]: monospaceNumbers,
            },
            className,
        )}
        style={{
            ...(color && { color }),
            ...(textBackgroundColor && { backgroundColor: textBackgroundColor }),
        }}
        data-test-id={dataTestId}
    >
        {children}
    </Component>
);
