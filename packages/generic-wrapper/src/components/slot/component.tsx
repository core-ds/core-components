import React, { ReactNode } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type GenericWrapperSlotProps = {
    children: ReactNode;
    grow?: boolean;
};

export const Slot = ({ children, grow }: GenericWrapperSlotProps) => (
    <div className={cn({ [styles.grow]: grow })}>{children}</div>
);
