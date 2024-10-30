import React, { useContext } from 'react';
import cn from 'classnames';

import { createPaddingStyle, getDataTestId } from '@alfalab/core-components-shared';
import { PaddingType } from '@alfalab/core-components-types';

import { SystemMessageContext } from '../../Context';

import styles from './index.module.css';

type ControlsProps = {
    /**
     * Расположение элементов футера
     */
    direction?: 'column' | 'row';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дочерние элементы
     */
    children: React.ReactNode;

    /**
     * Отступы
     */
    padding?: PaddingType;
};

const DEFAULT_DESKTOP_PADDING = { top: 24 };

const DEFAULT_MOBILE_PADDING = { top: 16 };

export const Controls: React.FC<ControlsProps> = ({
    direction: directionProp,
    children,
    className,
    padding: paddingProp,
}) => {
    const { dataTestId, view } = useContext(SystemMessageContext);
    const defaultDirection = view === 'mobile' ? 'column' : 'row';
    const direction = directionProp || defaultDirection;
    const isMultipleElements = React.Children.toArray(children).length > 1;
    const isColumn = isMultipleElements && direction === 'column';
    const padding =
        paddingProp ?? (view === 'mobile' ? DEFAULT_MOBILE_PADDING : DEFAULT_DESKTOP_PADDING);

    return (
        <div
            className={cn(styles.component, className, {
                [styles.row]: !isColumn,
                [styles.column]: isColumn,
                [styles.stretch]: isMultipleElements || view === 'mobile',
            })}
            data-test-id={getDataTestId(dataTestId, 'controls')}
            style={createPaddingStyle(padding)}
        >
            {children}
        </div>
    );
};

Controls.displayName = 'Controls';
