import React, { type FC, useContext } from 'react';
import cn from 'classnames';

import { TabBarIslandEntry } from '@alfalab/core-components-tab-bar-island/components/entry';
import { TabBarIslandContext } from '@alfalab/core-components-tab-bar-island/context';
import { DEFAULT_COLORS } from '@alfalab/core-components-tab-bar-island/default-props';
import { type TabBarIslandTabProps } from '@alfalab/core-components-tab-bar-island/types';

import defaultStyles from './default.module.css';
import styles from './index.module.css';
import invertedStyles from './inverted.module.css';

const colorsStyles = {
    default: defaultStyles,
    inverted: invertedStyles,
} as const;

export const TabBarIslandTab: FC<TabBarIslandTabProps> = ({
    tab: { icon, label, disabled, indicator },
    active,
    ...restProps
}) => {
    const { colors = DEFAULT_COLORS } = useContext(TabBarIslandContext);
    const colorStyles = colorsStyles[colors];

    return (
        <TabBarIslandEntry
            {...restProps}
            role='tab'
            aria-selected={active}
            className={cn(
                styles.tab,
                colorStyles.tab,
                active && [styles.active, colorStyles.active],
                {
                    [styles.disabled]: disabled,
                },
            )}
            icon={icon}
            label={label}
            indicator={indicator}
        />
    );
};
