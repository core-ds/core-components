import React, { useContext } from 'react';
import cn from 'classnames';

import { PureCellContext } from '../../component';
import { getDataTestId } from '../../../../utils/getDataTestId';
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
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Main: React.FC<Props> = ({ children, isReverse, dataTestId }) => {
    const { direction = 'horizontal' } = useContext(PureCellContext);

    return (
        <main
            className={cn(styles.component, styles[direction], {
                [styles.reverse]: isReverse,
            })}
            data-test-id={getDataTestId(dataTestId, 'main')}
        >
            {children}
        </main>
    );
};
