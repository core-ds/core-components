import React, { ReactNode } from 'react';
import cn from 'classnames';

import { Gap, GapProps } from '@alfalab/core-components-gap';

import styles from './index.module.css';

export type JustifyContentType = 'center' | 'start' | 'end' | 'between' | 'around';

export type LeftSideOptions = {
    /**
     * Дочерние элементы.
     */
    content: ReactNode;

    /**
     * Свойство выравнивает флекс-элементы внутри флекс-контейнера по основной оси.
     */
    justifyContent?: JustifyContentType;

    /**
     * Дополнительный класс
     */
    className?: string;
};

export type RightSideOptions = {
    /**
     * Дочерние элементы.
     */
    content: ReactNode;

    /**
     * Размер отступа между левой и правой частью.
     */
    gapSize?: Omit<GapProps['size'], '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'>;

    /**
     * Дополнительный класс
     */
    className?: string;
};

export type AddonProps = {
    /**
     * Левая часть.
     */
    leftSide: LeftSideOptions;

    /**
     * Правая часть.
     */
    rightSide?: RightSideOptions;

    /**
     * Свойство для выравнивания элементов внутри контейнера по поперечной оси.
     */
    alignItems?: 'center' | 'end' | 'start';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Addon = ({ leftSide, rightSide, alignItems, className, dataTestId }: AddonProps) => {
    const justifyContentStyles =
        leftSide.justifyContent && styles[`justify-content-${leftSide.justifyContent}`];
    const alignItemsStyles = alignItems && styles[`align-${alignItems}`];

    return (
        <div
            className={cn(styles.component, alignItemsStyles, className)}
            data-test-id={dataTestId}
        >
            <div className={cn(styles.leftSide, justifyContentStyles, leftSide.className)}>
                {leftSide.content}
            </div>
            {rightSide?.gapSize && (
                <Gap size={rightSide.gapSize as GapProps['size']} direction='horizontal' />
            )}
            {rightSide && (
                <div className={cn(styles.rightSide, rightSide.className)}>{rightSide.content}</div>
            )}
        </div>
    );
};
