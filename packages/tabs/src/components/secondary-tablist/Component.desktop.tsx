import React from 'react';

import { TagDesktop } from '@alfalab/core-components-tag/desktop';

import { SecondaryTabListProps } from '../../typings';

import { SecondaryTabList } from './Component';

import commonStyles from './index.module.css';

export type SecondaryTabListDesktopProps = Omit<SecondaryTabListProps, 'tagSize' | 'breakpoint'>;

export const SecondaryTabListDesktop = ({
    size = 's',
    ...restProps
}: SecondaryTabListDesktopProps) => (
    <SecondaryTabList
        {...restProps}
        TagComponent={TagDesktop}
        size={size}
        styles={commonStyles}
        tagSize={size}
    />
);
