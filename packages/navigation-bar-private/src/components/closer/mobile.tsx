import React from 'react';

import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import { type CloserBaseProps, CloserBase } from './Component';

import styles from './mobile.module.css';

export const CloserMobile = ({ icon = CrossMIcon, ...props }: CloserBaseProps) => (
    <CloserBase {...props} icon={icon} styles={styles} view='mobile' />
);
