import React from 'react';

import { type OptionCommonProps } from '../../../typings';
import { Checkmark as DefaultCheckMark } from '../../checkmark';
import { OptionBase } from '../Component';

import styles from './index.module.css';

export const OptionDesktop = ({ Checkmark = DefaultCheckMark, ...props }: OptionCommonProps) => (
    <OptionBase {...props} mobile={false} Checkmark={Checkmark} styles={styles} />
);
