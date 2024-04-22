import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { PureCellContext } from '../../component';
import { GraphicsElement } from '../types';

import styles from './index.module.css';

export type Props = {
    /**
     * Компоненты
     */
    children: GraphicsElement;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Используется модификатор -graphics
     */
    dataTestId?: string;

    /**
     * Вертикальное выравнивание
     */
    verticalAlign?: 'top' | 'center' | 'bottom';

    /**
     * Отступ от графики
     */
    graphicPadding?: 'airy' | 'default' | 'compact' | 'tiny' | 'none';

    /**
     * Клик по контенту графики.
     */
    onClick?: () => void;
};

export const Graphics: React.FC<Props> = ({
    children,
    dataTestId,
    verticalAlign = 'top',
    graphicPadding,
    onClick,
}) => {
    const pureCellContext = useContext(PureCellContext);

    const Component = onClick ? 'button' : 'section';

    const defaultGraphicPadding = pureCellContext.direction === 'horizontal' ? 'airy' : 'default';

    const events = onClick
        ? {
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  onClick();
              },
              onMouseEnter: () => {
                  pureCellContext.unsetMainHover?.();
              },
              onMouseLeave: () => {
                  pureCellContext.setMainHover?.();
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
                styles[verticalAlign],
                styles[pureCellContext.direction || 'horizontal'],
                styles[graphicPadding || defaultGraphicPadding],
                { [styles.button]: onClick },
            )}
            data-test-id={getDataTestId(dataTestId || pureCellContext.dataTestId, 'graphics')}
            {...events}
        >
            {children}
        </Component>
    );
};
