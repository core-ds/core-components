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

    /**
     * Клик по контенту.
     */
    onClick?: () => void;
};

export const Main: React.FC<Props> = ({ children, isReverse, className, dataTestId, onClick }) => {
    const {
        direction = 'horizontal',
        dataTestId: contextDataTestId,
        setMainHover,
        unsetMainHover,
    } = useContext(PureCellContext);

    const Component = onClick ? 'button' : 'section';

    const events = onClick
        ? {
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  onClick();
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
          }
        : {};

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
            {...events}
        >
            {children}
        </Component>
    );
};
