import React, { FC } from 'react';
import {
    TagDesktop as CoreTag,
    TagDesktopProps as TagProps,
} from '@balafla/core-components-tag/desktop';
import cn from 'classnames';

import styles from './index.module.css';

export const Tag: FC<TagProps> = ({ className, checked, ...restProps }) => (
    <CoreTag
        {...restProps}
        checked={checked}
        size='xxs'
        className={cn(className, styles.tag, { [styles.checked]: checked })}
    />
);
