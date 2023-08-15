import React, { useContext } from 'react';
import cn from 'classnames';

import { createPaddingStyle, getDataTestId } from '@alfalab/core-components-shared';

import { PaddingType } from '../../../../types';
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

    /**
     * Отступы
     */
    padding?: PaddingType;
};

const DEFAULT_PADDING = { bottom: 24 };

export const Graphic: React.FC<GraphicProps> = ({
    children,
    className,
    padding = DEFAULT_PADDING,
}) => {
    const { dataTestId } = useContext(SystemMessageContext);

    return (
        <div
            className={cn(styles.component, className)}
            data-test-id={getDataTestId(dataTestId, 'graphic')}
            style={createPaddingStyle(padding)}
        >
            {children}
        </div>
    );
};
