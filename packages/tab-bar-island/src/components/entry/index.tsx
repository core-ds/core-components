import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { TabBarIslandEntryContent } from '@alfalab/core-components-tab-bar-island/components/entry-content';
import { TabBarIslandContext } from '@alfalab/core-components-tab-bar-island/context';
import { DEFAULT_COLORS } from '@alfalab/core-components-tab-bar-island/default-props';
import { type TabBarIslandEntryProps } from '@alfalab/core-components-tab-bar-island/types';

import defaultStyles from './default.module.css';
import styles from './index.module.css';
import invertedStyles from './inverted.module.css';

const colorsStyles = {
    default: defaultStyles,
    inverted: invertedStyles,
} as const;

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
    iconClassName,
    Label,
    children,
    ...restProps
}) => {
    const { colors = DEFAULT_COLORS } = useContext(TabBarIslandContext);
    const colorStyles = colorsStyles[colors];

    return (
        <div
            {...restProps}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            className={cn(styles.entry, colorStyles.entry, className)}
            onClick={disabled ? undefined : onClick}
            onKeyDown={disabled ? undefined : onKeyDown}
        >
            <Content
                Icon={Icon}
                iconClassName={iconClassName}
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
};
