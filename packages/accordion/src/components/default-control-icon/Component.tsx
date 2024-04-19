import React, { FC } from 'react';
import cn from 'classnames';

import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';

import styles from './index.module.css';

type Props = {
    expanded: boolean;
    startPosition: boolean;
};
export const DefaultControlIcon: FC<Props> = ({ expanded, startPosition }) => (
    <ChevronDownMIcon
        className={cn(styles.icon, {
            [styles.expanded]: expanded,
            [styles.startPosition]: startPosition,
        })}
    />
);
