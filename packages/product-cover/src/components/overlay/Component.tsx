import React, { type FC } from 'react';
import cn from 'classnames';

import { type OverlayProps } from '../../typings';

import styles from './index.module.css';

export const Overlay: FC<OverlayProps> = ({ colors = 'default', visible }) => (
    <div
        className={cn(styles.overlay, styles[colors], {
            [styles.visible]: visible,
        })}
    />
);
