import React, { FC, ReactNode, Ref, useContext } from 'react';
import cn from 'classnames';

import { ModalContext } from '../../Context';

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
    const { contentRef } = useContext(ModalContext);

    return (
        <div
            className={cn(styles.content, className, styles.flex)}
            ref={contentRef as Ref<HTMLDivElement>}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};
