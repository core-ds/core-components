import React from 'react';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { OptgroupProps } from '../../typings';

import styles from './index.module.css';

export const Optgroup = ({ children, className, label, size = 48 }: OptgroupProps) => (
    <React.Fragment>
        <div className={cn(styles.optgroup, className, styles[SIZE_TO_CLASSNAME_MAP[size]])}>
            <span className={styles.label}>{label}</span>
        </div>
        {children}
    </React.Fragment>
);
