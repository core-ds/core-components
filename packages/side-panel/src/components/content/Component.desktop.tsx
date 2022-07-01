import React, { FC } from 'react';
import cn from 'classnames';
import { Content, ContentProps } from './Component';
import { SidePanelDesktopProps } from '../../Component.desktop';

import styles from './desktop.module.css';

export type ContentDesktopProps = ContentProps & {
    /**
     * Размер
     */
    size?: SidePanelDesktopProps['size'];
};

export const ContentDesktop: FC<ContentDesktopProps> = ({ size, className, ...restProps }) => (
    <Content className={cn(className, size && styles[size])} {...restProps} />
);
