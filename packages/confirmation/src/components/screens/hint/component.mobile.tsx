import React, { FC } from 'react';
import { Hint, HintProps } from './component';

import styles from './mobile.module.css';

export type HintMobileProps = HintProps;

export const HintMobile: FC<HintMobileProps> = ({ phoneClassName, mobile, ...restProps }) => (
    <Hint mobile={true} phoneClassName={styles.phone} {...restProps} />
);
