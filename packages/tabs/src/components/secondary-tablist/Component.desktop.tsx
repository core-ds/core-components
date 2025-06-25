import React from 'react';
import cn from 'classnames';

import { TagDesktop } from '@alfalab/core-components-tag/desktop';

import { SecondaryTabListProps } from '../../typings';

import { SecondaryTabList } from './Component';

import desktopStyles from './desktop.module.css';
import commonStyles from './index.module.css';

const styles = {
    ...commonStyles,
    ...desktopStyles,
};

export type SecondaryTabListDesktopProps = Omit<SecondaryTabListProps, 'tagSize' | 'breakpoint'>;

export const SecondaryTabListDesktop = ({
    size = 's',
    tagView,
    className,
    ...restProps
}: SecondaryTabListDesktopProps) => (
    <SecondaryTabList
        {...restProps}
        TagComponent={TagDesktop}
        size={size}
        styles={styles}
        className={cn(className, {
            [desktopStyles.transparentView]: tagView === 'transparent',
        })}
        tagSize={size}
        tagView={tagView}
        platform='desktop'
    />
);
