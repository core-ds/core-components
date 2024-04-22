import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { PureCellContext } from '../../component';
import { AddonElement } from '../types';

import styles from './index.module.css';

type Props = {
    /**
     * Вертикальное выравнивание
     */
    verticalAlign?: 'auto' | 'top' | 'center' | 'bottom';

    /**
     * Горизонтальные отступы
     */
    addonPadding?: 'default' | 'none';

    /**
     * Компоненты
     */
    children: AddonElement;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Используется модификатор -addon
     */
    dataTestId?: string;

    /**
     * Клик по контенту аддона.
     */
    onClick?: () => void;
};

export const Addon: React.FC<Props> = ({
    children,
    verticalAlign = 'top',
    addonPadding = 'default',
    dataTestId,
    onClick,
}) => {
    const pureCellContext = useContext(PureCellContext);

    const Component = onClick ? 'button' : 'section';

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
            className={cn(styles.component, styles[addonPadding], styles[verticalAlign], {
                [styles.button]: onClick,
            })}
            data-test-id={getDataTestId(dataTestId || pureCellContext.dataTestId, 'addon')}
            {...events}
        >
            {children}
        </Component>
    );
};
