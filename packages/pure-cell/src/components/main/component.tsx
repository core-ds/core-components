import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

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
};

export const Main: React.FC<Props> = ({ children, isReverse, className, dataTestId }) => {
    const { direction = 'horizontal' } = useContext(PureCellContext);

    return (
        <div
            className={cn(
                styles.component,
                styles[direction],
                {
                    [styles.reverse]: isReverse,
                },
                className,
            )}
            data-test-id={getDataTestId(dataTestId, 'main')}
        >
            {children}
        </div>
    );
};
