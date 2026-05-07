import React, { forwardRef } from 'react';
import cn from 'classnames';

import { type SelectModalMobileProps } from '../typings';

import { SelectMobile } from './Component.mobile';

import styles from './modal.mobile.module.css';

/**
 * @splitComponent mobile
 */
export const SelectModalMobile = forwardRef((props: SelectModalMobileProps, ref) => {
    const { modalHeaderProps, className: headerClassName } = props;

    return (
        <SelectMobile
            {...props}
            isBottomSheet={false}
            ref={ref}
            modalHeaderProps={{
                ...modalHeaderProps,
                className: cn(styles.header, headerClassName),
            }}
        />
    );
});
