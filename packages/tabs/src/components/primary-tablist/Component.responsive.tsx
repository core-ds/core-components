import React from 'react';

import { useMedia } from '@alfalab/hooks';

import { TabListProps, TabsMatchMedia } from '../../typings';

import { PrimaryTabListDesktop } from './Component.desktop';
import { PrimaryTabListMobile } from './Component.mobile';

export const PrimaryTabListResponsive = ({
    size,
    defaultMatch = 'desktop',
    collapsible,
    collapsedTabsIds,
    fullWidthScroll,
    ...restProps
}: TabListProps) => {
    const [view] = useMedia<TabsMatchMedia>(
        [
            ['mobile', '(max-width: 767px)'],
            ['desktop', '(min-width: 768px)'],
        ],
        defaultMatch,
    );

    return view === 'desktop' ? (
        <PrimaryTabListDesktop
            collapsible={collapsible}
            collapsedTabsIds={collapsedTabsIds}
            size={size}
            {...restProps}
        />
    ) : (
        <PrimaryTabListMobile fullWidthScroll={fullWidthScroll} {...restProps} />
    );
};
