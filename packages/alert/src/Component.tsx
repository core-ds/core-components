import React, { FC } from 'react';
import cn from 'classnames';

import { Plate, PlateProps } from '@alfalab/core-components-plate';

import styles from './index.module.css';

export type AlertProps = Omit<PlateProps, 'foldable' | 'defaultFolded' | 'leftAddons'>;

export const Alert: FC<AlertProps> = ({ className, title, ...restProps }) => (
    <Plate
        className={cn(styles.component, className)}
        title={title ? <span className={styles.title}>{title}</span> : null}
        rounded={false}
        limitContentWidth={false}
        {...restProps}
    />
);
