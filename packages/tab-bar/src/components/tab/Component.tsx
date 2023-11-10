import React, { cloneElement, forwardRef, isValidElement, MouseEvent } from 'react';
import cn from 'classnames';

import { Badge } from '@alfalab/core-components-badge';
import { Typography } from '@alfalab/core-components-typography';

import { PrivateTabProps, TabProps } from '../../types';

import styles from './index.module.css';

const TabComponent = forwardRef(
    (
        {
            showIndicator,
            indicatorProps,
            label,
            icon,
            id,
            selected,
            onChange,
            onClick,
            tabClassNames = {},
            dataTestId,
            className,
            labelClassName,
            selectedClassName,
            iconClassName,
            href,
            Component = href ? 'a' : 'button',
            ...restProps
        }: PrivateTabProps & TabProps,
        ref,
    ) => {
        const handleClick = (event: MouseEvent) => {
            onChange?.(id);
            onClick?.(event);
        };

        const {
            className: commonClassName,
            labelClassName: commonLabelClassName,
            selectedClassName: commonSelectedClassName,
            iconClassName: commonIconClassName,
        } = tabClassNames;

        return (
            <Component
                data-test-id={dataTestId}
                tabIndex={0}
                {...(Component === 'button' ? { type: 'button' } : null)}
                {...restProps}
                href={href}
                id={id}
                ref={ref}
                className={cn(
                    styles.component,
                    commonClassName,
                    className,
                    selected && commonSelectedClassName,
                    selected && selectedClassName,
                    {
                        [styles.selected]: selected,
                    },
                )}
                onClick={handleClick}
            >
                <div className={cn(styles.icon, commonIconClassName, iconClassName)}>
                    {isValidElement(icon) ? cloneElement(icon, { selected }) : icon}
                </div>

                <Typography.Text
                    weight='medium'
                    view='secondary-small'
                    className={cn(styles.label, commonLabelClassName, labelClassName, {
                        [styles.labelSelected]: selected,
                    })}
                >
                    {isValidElement(label) ? cloneElement(label, { selected }) : label}
                </Typography.Text>

                {showIndicator && (
                    <div className={styles.indicator}>
                        <Badge visibleIconOutline={true} {...indicatorProps} view='count' />
                    </div>
                )}
            </Component>
        );
    },
);

export const Tab = TabComponent as React.ForwardRefExoticComponent<
    TabProps & React.RefAttributes<HTMLElement>
>;
