import React from 'react';

import { useMedia } from '@alfalab/hooks';

import { SecondaryTabListProps, TabsMatchMedia } from '../../typings';

import { SecondaryTabListDesktop } from './Component.desktop';
import { SecondaryTabListMobile } from './Component.mobile';

export const SecondaryTabListResponsive = ({
    size,
    defaultMatch = 'desktop',
    fullWidthScroll,
    ...restProps
}: Omit<SecondaryTabListProps, 'isMobile'>) => {
    const [view] = useMedia<TabsMatchMedia>(
        [
            ['mobile', '(max-width: 767px)'],
            ['desktop', '(min-width: 768px)'],
        ],
        defaultMatch,
    );

    return view === 'desktop' ? (
        <SecondaryTabListDesktop size={size} {...restProps} />
    ) : (
        <SecondaryTabListMobile fullWidthScroll={fullWidthScroll} {...restProps} />
    );
};
