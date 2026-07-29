import React, { type FC } from 'react';
import cn from 'classnames';

import { TabBarIslandEntryContent } from '@alfalab/core-components-tab-bar-island/components/entry-content';
import { type TabBarIslandEntryProps } from '@alfalab/core-components-tab-bar-island/types';

import styles from './index.module.css';

export const TabBarIslandEntry: FC<TabBarIslandEntryProps> = ({
    className,
    label,
    icon,
    indicator,
    disabled,
    onClick,
    onKeyDown,
    Content = TabBarIslandEntryContent,
    Icon,
    Label,
    children,
    ...restProps
}) => (
    <div
        {...restProps}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={cn(styles.entry, className)}
        onClick={disabled ? undefined : onClick}
        onKeyDown={disabled ? undefined : onKeyDown}
    >
        <Content
            Icon={Icon}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            icon={icon}
            Label={Label}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            label={label}
            indicator={indicator}
        >
            {children}
        </Content>
    </div>
);
