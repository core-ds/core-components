import React, { ReactNode, useContext } from 'react';
import { getDataTestId } from '@balafla/core-components-shared';
import cn from 'classnames';

import { ResponsiveContext } from '../../ResponsiveContext';

import layoutStyles from '../footer/layout.module.css';
import styles from './index.module.css';

export interface ControlsProps {
    /**
     * Основной слот
     */
    primary?: ReactNode;

    /**
     * Дополнительный слот
     */
    secondary?: ReactNode;

    /**
     * Выравнивание элементов футера
     * @default start
     */
    layout?: 'start' | 'center' | 'space-between' | 'column';

    /**
     * Выравнивание элементов футера (мобильный view)
     * @default start
     */
    mobileLayout?: 'start' | 'center' | 'space-between' | 'column';

    /**
     * Отступы между элементами футера
     */
    gap?: 16 | 24 | 32;
}

export const Controls: React.FC<ControlsProps> = ({
    primary,
    secondary,
    gap,
    layout: layoutProp = 'start',
    mobileLayout = layoutProp,
}) => {
    const { view, dataTestId } = useContext(ResponsiveContext);

    const layout = view === 'mobile' ? mobileLayout : layoutProp;

    const shouldReverse = view === 'mobile' && layout !== 'column';

    return (
        <div
            data-test-id={getDataTestId(dataTestId, 'controls')}
            className={cn(
                styles.component,
                layoutStyles[layout],
                gap && layoutStyles[`gap-${gap}`],
            )}
        >
            {shouldReverse ? (
                <React.Fragment>
                    {secondary}
                    {primary}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {primary}
                    {secondary}
                </React.Fragment>
            )}
        </div>
    );
};
