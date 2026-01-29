import React from 'react';
import cn from 'classnames';

import { TagDesktop } from '@alfalab/core-components-tag/desktop';

import { type SecondaryTabListProps } from '../../typings';
import { ScrollableContainerDesktop } from '../scrollable-container/Component.desktop';

import { SecondaryTabList } from './Component';

import styles from './index.module.css';

export type SecondaryTabListDesktopProps = Omit<SecondaryTabListProps, 'tagSize' | 'breakpoint'>;

export const SecondaryTabListDesktop = ({
    className,
    size = 's',
    tagView,
    ...restProps
}: SecondaryTabListDesktopProps) => (
    <SecondaryTabList
        {...restProps}
        TagComponent={TagDesktop}
        ScrollableContainer={ScrollableContainerDesktop}
        size={size}
        styles={styles}
        className={cn(className, styles.desktop, {
            [styles.transparentView]: tagView === 'transparent',
        })}
        tagSize={size}
        tagView={tagView}
        platform='desktop'
    />
);
