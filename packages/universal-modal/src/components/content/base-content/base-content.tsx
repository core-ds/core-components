import React, { FC, ReactNode, Ref, useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../../Context';

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

export const BaseContent: FC<ContentProps> = ({ children, className, dataTestId }) => {
    const { contentRef, hasHeader, hasFooter } = useContext(ModalContext);

    return (
        <div
            className={cn(styles.content, className, {
                [styles.withHeader]: hasHeader,
                [styles.withFooter]: hasFooter,
            })}
            ref={contentRef as Ref<HTMLDivElement>}
            data-test-id={getDataTestId(dataTestId, 'content')}
        >
            {children}
        </div>
    );
};
