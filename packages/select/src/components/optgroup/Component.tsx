import React, { type FC } from 'react';
import cn from 'classnames';

import { type OptgroupProps } from '../../typings';

import styles from './index.module.css';

export const Optgroup: FC<OptgroupProps> = ({ children, className, label, size = 48 }) => (
    <React.Fragment>
        <div className={cn(styles.optgroup, className, styles[`size-${size}`])}>
            <span className={styles.label}>{label}</span>
        </div>
        {children}
    </React.Fragment>
);
