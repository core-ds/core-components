import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { UniversalModalContext } from '../../../context/universal-modal-context';
import { BaseContent, type ContentProps } from '../base-content/base-content';

import styles from './desktop.module.css';

export interface ContentDesktopProps extends ContentProps {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
}

export const ContentDesktop: FC<ContentDesktopProps> = ({ className, ...restProps }) => {
    const { hasHeader, hasFooter } = useContext(UniversalModalContext);

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
