import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import { Styles, TabListTitle } from '../../typings';

type Props = TabListTitle &
    Styles &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'> & { focused?: boolean; isOption?: boolean };

export const Title = forwardRef<HTMLButtonElement, Props>(
    (
        {
            id,
            toggleClassName,
            title,
            styles = {},
            rightAddons = null,
            hidden = false,
            selected = false,
            disabled = false,
            collapsed = false,
            focused = false,
            isOption = false,
            ...restProps
        },
        ref,
    ) =>
        hidden ? null : (
            <button
                {...restProps}
                ref={ref}
                type='button'
                id={String(id)}
                className={cn(
                    styles.title,
                    {
                        [styles.selected]: selected,
                        [styles.disabled]: disabled,
                        [styles.collapsed]: collapsed && !isOption,
                        [styles.option]: isOption,
                    },
                    toggleClassName,
                )}
            >
                <span className={cn(styles.content, { [styles.focused]: focused })}>{title}</span>

                {rightAddons && <span className={styles.rightAddons}>{rightAddons}</span>}
            </button>
        ),
);
