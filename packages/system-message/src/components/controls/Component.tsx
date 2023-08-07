import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { SystemMessageContext } from '../../Context';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

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
};

export const Controls: React.FC<ControlsProps> = ({
    direction: directionProp,
    children,
    className,
}) => {
    const { dataTestId, view } = useContext(SystemMessageContext);
    const defaultDirection = view === 'mobile' ? 'column' : 'row';
    const direction = directionProp || defaultDirection;
    const isMultipleElements = React.Children.toArray(children).length > 1;
    const isColumn = isMultipleElements && direction === 'column' && view === 'mobile';

    return (
        <div
            className={cn(styles.component, className, {
                [styles.row]: !isColumn,
                [styles.column]: isColumn,
                [desktopStyles.component]: view === 'desktop',
                [desktopStyles.multiple]: isMultipleElements,
                [mobileStyles.component]: view === 'mobile',
            })}
            data-test-id={getDataTestId(dataTestId, 'controls')}
        >
            {children}
        </div>
    );
};

Controls.displayName = 'Controls';
