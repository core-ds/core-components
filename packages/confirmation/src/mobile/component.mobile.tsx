import React, { type FC } from 'react';
import cn from 'classnames';

import { BaseConfirmation } from '../components/base-confirmation';
import { type ConfirmationProps } from '../types';

import styles from './mobile.module.css';

export type MobileConfirmationProps = Omit<ConfirmationProps, 'mobile'>;

export const ConfirmationMobile: FC<MobileConfirmationProps> = ({ className, ...resProps }) => (
    <BaseConfirmation mobile={true} className={cn(className, styles.container)} {...resProps} />
);
