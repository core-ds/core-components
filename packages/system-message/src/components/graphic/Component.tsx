import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { SystemMessageContext } from '../../Context';

import styles from './index.module.css';

type GraphicProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Элемент с иконкой
     */
    children: React.ReactNode;
};

export const Graphic: React.FC<GraphicProps> = ({ children, className }) => {
    const { dataTestId } = useContext(SystemMessageContext);

    return (
        <div
            className={cn(styles.component, className)}
            data-test-id={getDataTestId(dataTestId, 'graphic')}
        >
            {children}
        </div>
    );
};
