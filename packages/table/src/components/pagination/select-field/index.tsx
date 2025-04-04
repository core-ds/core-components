import React from 'react';
import { Button, ButtonProps } from '@balafla/core-components-button';
import { SelectProps } from '@balafla/core-components-select';
import cn from 'classnames';

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
