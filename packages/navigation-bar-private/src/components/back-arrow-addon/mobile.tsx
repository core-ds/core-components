import React from 'react';

import { ArrowLeftMIcon } from '@alfalab/icons-glyph/ArrowLeftMIcon';

import { type BackArrowAddonBaseProps, BackArrowAddonBase } from './Component';

import styles from './mobile.module.css';

export const BackArrowAddonMobile = (props: BackArrowAddonBaseProps) => (
    <BackArrowAddonBase {...props} Icon={ArrowLeftMIcon} styles={styles} view='mobile' />
);
