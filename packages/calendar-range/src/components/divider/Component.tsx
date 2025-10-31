import React, { type FC } from 'react';
import cn from 'classnames';

import { type CalendarRangeProps } from '../../Component';

import styles from './index.module.css';

type Props = {
    inputFromProps?: CalendarRangeProps['inputFromProps'];
    inputToProps?: CalendarRangeProps['inputToProps'];
};

export const Divider: FC<Props> = ({ inputFromProps, inputToProps }) => {
    const outer =
        inputFromProps?.label &&
        inputFromProps?.labelView === 'outer' &&
        inputToProps?.label &&
        inputToProps?.labelView === 'outer';

    const size = inputFromProps?.size || inputToProps?.size || 's';

    return <span className={cn(styles.component, styles[size], { [styles.outer]: outer })} />;
};
