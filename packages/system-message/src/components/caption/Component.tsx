import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

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
};

export const Caption: React.FC<CaptionProps> = ({ className, children }) => {
    const { dataTestId } = useContext(SystemMessageContext);

    return (
        <span
            className={cn(styles.component, className)}
            data-test-id={getDataTestId(dataTestId, 'caption')}
        >
            {children}
        </span>
    );
};
