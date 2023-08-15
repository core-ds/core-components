import React, { useContext } from 'react';
import cn from 'classnames';

import { createPaddingStyle, getDataTestId } from '@alfalab/core-components-shared';

import { PaddingType } from '../../../../types';
import { SystemMessageContext } from '../../Context';

import styles from './index.module.css';

type CaptionProps = {
    /**
     * Дополнительно имя класса
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

const DEFAULT_PADDING = { bottom: 12 };

export const Caption: React.FC<CaptionProps> = ({
    className,
    children,
    padding = DEFAULT_PADDING,
}) => {
    const { dataTestId } = useContext(SystemMessageContext);

    return (
        <span
            className={cn(styles.component, className)}
            data-test-id={getDataTestId(dataTestId, 'caption')}
            style={createPaddingStyle(padding)}
        >
            {children}
        </span>
    );
};
