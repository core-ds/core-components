import React, { ReactNode } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type GenericWrapperAddonProps = {
    children: ReactNode;
    grow?: boolean;
};

export const Addon = ({ children, grow }: GenericWrapperAddonProps) => (
    <div className={cn({ [styles.grow]: grow })}>{children}</div>
);
