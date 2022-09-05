import React, { FC } from 'react';
import { Hint, HintProps } from './component';

import styles from './mobile.module.css';

export type HintMobileProps = HintProps;

export const HintMobile: FC<HintMobileProps> = ({ mobile, phoneClassName, ...restProps }) => (
    <Hint mobile={true} phoneClassName={styles.phoneContent} {...restProps} />
);
