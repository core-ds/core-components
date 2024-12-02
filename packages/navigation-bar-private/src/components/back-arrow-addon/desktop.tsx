import React from 'react';

import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import { type BackArrowAddonBaseProps, BackArrowAddonBase } from './Component';

import styles from './desktop.module.css';

export const BackArrowAddonDesktop = (props: BackArrowAddonBaseProps) => (
    <BackArrowAddonBase {...props} Icon={ArrowLeftMediumMIcon} styles={styles} view='desktop' />
);
