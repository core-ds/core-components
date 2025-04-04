import React, { forwardRef } from 'react';
import { Input } from '@balafla/core-components-input';
import cn from 'classnames';

import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';

import { SearchProps } from '../../typings';

import styles from './index.module.css';

export const Search = forwardRef<HTMLInputElement, SearchProps>(
    (
        {
            clear = true,
            placeholder = 'Поиск',
            className,
            leftAddons = <MagnifierMIcon color='#86868A' />,
            ...restProps
        },
        ref,
    ) => (
        <Input
            ref={ref}
            className={cn(styles.component, className)}
            placeholder={placeholder}
            leftAddons={leftAddons}
            clear={clear}
            {...restProps}
        />
    ),
);
