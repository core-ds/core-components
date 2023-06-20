import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { SystemMessageContext } from '../../Context';

import styles from './index.module.css';

type SubtitleProps = {
    /**
     * Дополнительно имя класса
     */
    className?: string;

    /**
     * Заголовок
     */
    children: React.ReactNode;
};

export const Subtitle: React.FC<SubtitleProps> = ({ className, children }) => {
    const { dataTestId } = useContext(SystemMessageContext);

    return (
        <span
            className={cn(styles.component, className)}
            data-test-id={getDataTestId(dataTestId, 'subtitle')}
        >
            {children}
        </span>
    );
};
