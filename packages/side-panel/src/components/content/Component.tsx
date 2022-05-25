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
};

export const Content: FC<ContentProps> = ({ children, className }) => {
    const { contentRef } = useContext(ModalContext);

    return (
        <div
            className={cn(styles.content, className, styles.flex)}
            ref={contentRef as Ref<HTMLDivElement>}
        >
            {children}
        </div>
    );
};
