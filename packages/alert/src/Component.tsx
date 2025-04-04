import React, { FC } from 'react';
import { type Plate, type PlateProps } from '@balafla/core-components-plate';
import { type PlateDesktop } from '@balafla/core-components-plate/desktop';
import { type PlateMobile } from '@balafla/core-components-plate/mobile';
import cn from 'classnames';

import styles from './index.module.css';

export type AlertProps = Omit<PlateProps, 'foldable' | 'defaultFolded' | 'leftAddons'>;

type AlertPrivateProps = {
    Plate: typeof Plate | typeof PlateDesktop | typeof PlateMobile;
};

export const AlertBase: FC<AlertProps & AlertPrivateProps> = ({
    className,
    title,
    Plate,
    ...restProps
}) => (
    <Plate
        className={cn(styles.component, className)}
        title={title ? <span className={styles.title}>{title}</span> : null}
        rounded={false}
        limitContentWidth={false}
        {...restProps}
    />
);
