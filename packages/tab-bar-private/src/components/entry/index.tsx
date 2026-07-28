import React, { type FC } from 'react';
import cn from 'classnames';

import { TabBarPrivateEntryContent } from '@alfalab/core-components-tab-bar-private/components/entry-content';
import { type TabBarPrivateEntryProps } from '@alfalab/core-components-tab-bar-private/types';

import styles from '@alfalab/core-components-tab-bar-private/components/entry/index.module.css';

export const TabBarPrivateEntry: FC<TabBarPrivateEntryProps> = ({
    className,
    label,
    icon,
    indicator,
    disabled,
    onClick,
    onKeyDown,
    Content = TabBarPrivateEntryContent,
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
