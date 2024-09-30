import React, { FC, ReactNode, Ref, useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';

import styles from './index.module.css';

export type ContentProps = {
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Content: FC<ContentProps> = ({ children, className, dataTestId }) => {
    const { contentRef, hasHeader } = useContext(ModalContext);
    const responsiveContext = useContext(ResponsiveContext);

    return (
        <div
            className={cn(styles.content, className, styles.flex, {
                [styles.withHeader]: hasHeader,
            })}
            ref={contentRef as Ref<HTMLDivElement>}
            data-test-id={dataTestId || getDataTestId(responsiveContext?.dataTestId, 'content')}
        >
            {children}
        </div>
    );
};
