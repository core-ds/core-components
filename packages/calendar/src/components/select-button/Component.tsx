import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { ButtonDesktop as Button } from '@balafla/core-components-button/desktop';
import cn from 'classnames';

import styles from './index.module.css';

export type SelectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Вид кнопки
     */
    view?: 'default' | 'filled' | 'current' | 'selected';
};

export const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
    ({ className, children, view = 'default', ...restProps }, ref) => (
        <Button
            {...restProps}
            ref={ref}
            view='text'
            size='xs'
            className={cn(styles.button, styles[view], className)}
        >
            {children}
        </Button>
    ),
);
