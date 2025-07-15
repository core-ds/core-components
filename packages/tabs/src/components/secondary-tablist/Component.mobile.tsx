import React from 'react';
import cn from 'classnames';

import { TagMobile } from '@alfalab/core-components-tag/mobile';

import { SecondaryTabListProps } from '../../typings';

import { SecondaryTabList } from './Component';

import commonStyles from './index.module.css';
import mobileStyles from './mobile.module.css';

const styles = {
    ...commonStyles,
    ...mobileStyles,
};

export type SecondaryTabListMobileProps = Omit<SecondaryTabListProps, 'tagSize'>;

export const SecondaryTabListMobile = ({
    className,
    size,
    tagView,
    ...restProps
}: SecondaryTabListMobileProps) => (
    <SecondaryTabList
        {...restProps}
        TagComponent={TagMobile}
        styles={styles}
        className={cn(className, styles.mobile, {
            [styles.transparentView]: tagView === 'transparent',
        })}
        tagSize={size}
        tagView={tagView}
        platform='mobile'
    />
);
