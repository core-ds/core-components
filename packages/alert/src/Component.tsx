import React, { type FC } from 'react';
import cn from 'classnames';

import { type Plate, type PlateProps } from '@alfalab/core-components-plate';
import { type PlateDesktop } from '@alfalab/core-components-plate/desktop';
import { type PlateMobile } from '@alfalab/core-components-plate/mobile';

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
