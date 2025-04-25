import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { ResponsiveContext } from '../../../context/responsive-context';
import { BaseContent, ContentProps } from '../base-content/base-content';

import styles from './desktop.module.css';

export type ContentDesktopProps = ContentProps & {
    /**
     * Размер (только для desktop версии компонента)
     */
    size?: 's' | 500;
};

export const ContentDesktop: FC<ContentDesktopProps> = ({ className, ...restProps }) => {
    const { hasHeader, hasFooter } = useContext(ResponsiveContext);

    return (
        <BaseContent
            className={cn(className, {
                [styles.withHeader]: hasHeader,
                [styles.withFooter]: hasFooter,
            })}
            {...restProps}
        />
    );
};
