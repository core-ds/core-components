import React, { FC } from 'react';
import cn from 'classnames';

import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';

import styles from './index.module.css'

type Props = {
    expanded: boolean;
    isStartPosition: boolean;
}
export const DefaultControlIcon: FC<Props> = ({ expanded, isStartPosition}) => <ChevronDownMIcon className={cn(styles.icon, {
    [styles.expanded]: expanded,
    [styles.startPosition]: isStartPosition
})} />;
