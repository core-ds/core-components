import React, { type ComponentPropsWithoutRef, type ComponentType, type FC, useRef } from 'react';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';

import defaultStyles from './default.module.css';
import styles from './index.module.css';
import invertedStyles from './inverted.module.css';

const colorsStyles = {
    default: defaultStyles,
    inverted: invertedStyles,
};

interface NavigationButtonProps
    extends Pick<
        ComponentPropsWithoutRef<'button'>,
        'onClick' | 'slot' | 'disabled' | 'className'
    > {
    icon: ComponentType<ComponentPropsWithoutRef<'svg'>>;
    colors?: 'default' | 'inverted';
}

export const NavigationButton: FC<NavigationButtonProps> = ({
    className,
    icon: Icon,
    disabled,
    colors = 'default',
    ...restProps
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [focused] = useFocus(ref, 'keyboard');
    const colorStyles = colorsStyles[colors];

    return (
        <button
            {...restProps}
            ref={ref}
            type='button'
            disabled={disabled}
            className={cn(styles.component, colorStyles.component, className, {
                [styles.focused]: focused,
            })}
        >
            <span className={cn(styles.icon, colorStyles.icon)}>
                <Icon />
            </span>
        </button>
    );
};
