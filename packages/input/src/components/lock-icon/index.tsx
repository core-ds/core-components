import React from 'react';

import { LockClosedMIcon } from '@alfalab/icons-glyph/LockClosedMIcon';
import { LockClosedSIcon } from '@alfalab/icons-glyph/LockClosedSIcon';

import { type BaseInputProps } from '../base-input/types/base-input-props';

import styles from './index.module.css';

type Props = Required<Pick<BaseInputProps, 'colors' | 'size'>>;

export const LockIcon = (props: Props) => {
    const { colors, size } = props;

    const Component = size === 40 ? LockClosedSIcon : LockClosedMIcon;

    return <Component className={styles[`lockIcon_${colors}`]} data-name='input-lock-icon' />;
};
