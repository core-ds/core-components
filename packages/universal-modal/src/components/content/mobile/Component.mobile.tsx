import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { ModalContext } from '../../../Context';
import { BaseContent, type ContentProps } from '../base-content/base-content';

import styles from './mobile.module.css';

export type ContentMobileProps = ContentProps;

export const ContentMobile: FC<ContentMobileProps> = ({ className, ...restProps }) => {
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
