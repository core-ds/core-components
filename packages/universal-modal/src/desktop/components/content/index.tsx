import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { BaseContent, type ContentProps } from '../../../components/base-content';
import { ModalContext } from '../../../Context';

import styles from './desktop.module.css';

export interface ContentDesktopProps extends ContentProps {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
}

/**
 * @splitComponent desktop
 */
export const ContentDesktop: FC<ContentDesktopProps> = ({ className, ...restProps }) => {
    const { hasHeader, hasFooter } = useContext(ModalContext);

    return (
        <BaseContent
            className={cn(styles.content, className, {
                [styles.withHeader]: hasHeader,
                [styles.withFooter]: hasFooter,
            })}
            {...restProps}
        />
    );
};
