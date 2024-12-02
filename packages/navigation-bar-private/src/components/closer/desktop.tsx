import React from 'react';

import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon';

import { type CloserBaseProps, CloserBase } from './Component';

import styles from './desktop.module.css';

export const CloserDesktop = ({ icon = CrossHeavyMIcon, ...props }: CloserBaseProps) => (
    <CloserBase {...props} icon={icon} styles={styles} view='desktop' />
);
