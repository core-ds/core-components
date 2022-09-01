import React, { FC } from 'react';
import { Initial, InitialProps } from './component';

import styles from './mobile.module.css';

export type InitialMobileProps = InitialProps;

export const InitialMobile: FC<InitialMobileProps> = ({ inputClassName, ...restProps }) => (
    <Initial mobile={true} inputClassName={styles.codeInput} {...restProps} />
);
