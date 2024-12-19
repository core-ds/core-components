import React from 'react';

import type { OptionCommonProps } from '../../../typings';
import { Checkmark as DefaultCheckMark } from '../../checkmark-mobile';
import { OptionBase } from '../Component';

import styles from './index.module.css';

export const OptionMobile = ({ Checkmark = DefaultCheckMark, ...props }: OptionCommonProps) => (
    <OptionBase {...props} mobile={true} Checkmark={Checkmark} styles={styles} />
);
