import React from 'react';
import cn from 'classnames';

import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import { type CloserProps, CloserComponent } from './Component';

import styles from './icon-button.mobile.module.css';

export const CloserMobile = ({ icon = CrossMIcon, ...props }: CloserProps) => (
    <CloserComponent
        {...props}
        icon={icon}
        iconButtonProps={{
            size: 'xs',
            className: cn(
                styles.button,
                // TODO удалить, оставлен для сохранение snapshot
                styles.mobile,
            ),
        }}
    />
);
