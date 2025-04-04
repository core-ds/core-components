import React, { useContext } from 'react';
import { getDataTestId } from '@balafla/core-components-shared';
import cn from 'classnames';

import { PureCellContext } from '../../component';
import { MainElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Компоненты
     */
    children: MainElement;

    /**
     * Позволяет изменить расположение блоков внутри main
     */
    isReverse?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Используется модификатор -main
     */
    dataTestId?: string;

    /**
     * Клик по контенту.
     */
    onClick?: () => void;
};

const MAIN_COMPONENT: Record<string, keyof Pick<React.ReactHTML, 'button' | 'section'>> = {
    button: 'button',
    section: 'section',
};

export const Main: React.FC<Props> = ({ children, isReverse, className, dataTestId, onClick }) => {
    const {
        direction = 'horizontal',
        dataTestId: contextDataTestId,
        setMainHover,
        unsetMainHover,
    } = useContext(PureCellContext);

    const Component = onClick ? MAIN_COMPONENT.button : MAIN_COMPONENT.section;

    const onMouseEvents = {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onClick?.();
        },
        onMouseEnter: () => {
            unsetMainHover?.();
        },
        onMouseLeave: () => {
            setMainHover?.();
        },
        onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
        },
    };

    return (
        <Component
            className={cn(
                styles.component,
                styles[direction],
                {
                    [styles.reverse]: isReverse,
                },
                { [styles.button]: onClick },
                className,
            )}
            data-test-id={getDataTestId(dataTestId || contextDataTestId, 'main')}
            {...(onClick && onMouseEvents)}
        >
            {children}
        </Component>
    );
};
