import React from 'react';
import cn from 'classnames';

import { SecondaryTabListProps } from '../../typings';

import { SecondaryTabList } from './Component';

import commonStyles from './index.module.css';
import mobileStyles from './mobile.module.css';

const styles = {
    ...commonStyles,
    ...mobileStyles,
};

export type SecondaryTabListMobileProps = Omit<
    SecondaryTabListProps,
    'size' | 'tagSize' | 'isMobile'
>;

export const SecondaryTabListMobile = ({
    className,
    breakpoint = 1024,
    ...restProps
}: SecondaryTabListMobileProps) => (
    <SecondaryTabList
        {...restProps}
        styles={styles}
        className={cn(className, styles.mobile)}
        tagSize='xs'
        isMobile={true}
        breakpoint={breakpoint}
    />
);
