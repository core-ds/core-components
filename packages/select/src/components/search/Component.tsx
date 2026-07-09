import React, { forwardRef } from 'react';
import cn from 'classnames';

import { Input } from '@alfalab/core-components-input';
import { InputDesktop } from '@alfalab/core-components-input/desktop';
import { InputMobile } from '@alfalab/core-components-input/mobile';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';

import { type SearchProps } from '../../typings';

import styles from './index.module.css';

const getComponent = (client: SearchProps['client']) => {
    switch (client) {
        case 'desktop':
            return InputDesktop;
        case 'mobile':
            return InputMobile;
        default:
            return Input;
    }
};

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
    ) => {
        const { client } = restProps;

        const Component = getComponent(client);

        return (
            <Component
                ref={ref}
                className={cn(styles.component, className)}
                placeholder={placeholder}
                leftAddons={leftAddons}
                clear={clear}
                {...restProps}
            />
        );
    },
);
