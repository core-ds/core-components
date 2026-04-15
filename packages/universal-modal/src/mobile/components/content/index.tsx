import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { BaseContent, type ContentProps } from '../../../components/base-content';
import { ModalContext } from '../../../Context';

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
