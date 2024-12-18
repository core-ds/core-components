import React from 'react';

import { OptionCommonProps } from '../../../typings';
import { BaseOptionCommon } from '../Component';

import styles from './index.module.css'

export const BaseOptionMobile = (props: OptionCommonProps) =>
    <BaseOptionCommon {...props} mobile={true} styles={styles} />;
