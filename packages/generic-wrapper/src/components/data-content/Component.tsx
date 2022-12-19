import React, { ReactNode } from 'react';
import cn from 'classnames';

import { Addon } from './components/addon';

import styles from './index.module.css';

export type DataContentProps = {
    children: ReactNode;
};

const DataContentComponent = ({ children }: DataContentProps) => (
    <div className={cn(styles.component)}>{children}</div>
);

export const DataContent = Object.assign(DataContentComponent, {
    Addon,
});
