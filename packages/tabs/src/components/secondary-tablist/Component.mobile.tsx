import React from 'react';
import { TagMobile } from '@balafla/core-components-tag/mobile';
import cn from 'classnames';

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
    ...restProps
}: SecondaryTabListMobileProps) => (
    <SecondaryTabList
        {...restProps}
        TagComponent={TagMobile}
        styles={styles}
        className={cn(className, styles.mobile)}
        tagSize={size}
        platform='mobile'
    />
);
