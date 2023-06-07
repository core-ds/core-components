import React from 'react';

import { SecondaryTabListProps } from '../../typings';

import { SecondaryTabList } from './Component';

import commonStyles from './index.module.css';

export type SecondaryTabListDesktopProps = Omit<
    SecondaryTabListProps,
    'tagSize' | 'isMobile' | 'breakpoint'
>;

export const SecondaryTabListDesktop = ({
    size = 's',
    ...restProps
}: SecondaryTabListDesktopProps) => (
    <SecondaryTabList {...restProps} size={size} styles={commonStyles} tagSize={size} />
);
