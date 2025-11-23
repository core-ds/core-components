import React from 'react';
import cn from 'classnames';

import { Button, type ButtonProps } from '@alfalab/core-components-button';
import { type SelectProps } from '@alfalab/core-components-select';

import styles from './index.module.css';

export const CustomSelectField: SelectProps['Field'] = ({ selected, innerProps, Arrow, open }) => {
    const { ref, ...restInnerProps } = innerProps;

    return (
        <div ref={ref}>
            <Button
                {...(restInnerProps as ButtonProps)}
                size='xxs'
                view='transparent'
                className={cn(styles.field, { [styles.open]: open })}
                rightAddons={Arrow}
            >
                {selected?.content}
            </Button>
        </div>
    );
};
