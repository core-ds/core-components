import React from 'react';

import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon';

import { type CloserProps, CloserComponent } from './Component';

import styles from './icon-button.desktop.module.css';

export const CloserDesktop = ({ icon = CrossHeavyMIcon, ...props }: CloserProps) => (
    <CloserComponent
        {...props}
        icon={icon}
        iconButtonProps={{ size: 's', className: styles.button }}
    />
);
