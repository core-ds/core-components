import React, { FC } from 'react';
import cn from 'classnames';

import { OverlayProps } from '../../typings';

import styles from './index.module.css';

export const Overlay: FC<OverlayProps> = ({ color = 'default', visible }) => (
    <div
        className={cn(styles.overlay, styles[color], {
            [styles.visible]: visible,
        })}
    />
);
