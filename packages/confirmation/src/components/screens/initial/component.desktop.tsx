import React, { FC } from 'react';
import { Initial, InitialProps } from './component';

import styles from './desktop.module.css';

export type InitialDesktopProps = InitialProps;

export const InitialDesktop: FC<InitialDesktopProps> = ({ inputClassName, ...restProps }) => (
    <Initial inputClassName={styles.codeInput} {...restProps} />
);
