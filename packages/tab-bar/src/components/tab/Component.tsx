import React, { cloneElement, forwardRef, isValidElement, MouseEvent } from 'react';
import cn from 'classnames';

import { Indicator } from '@alfalab/core-components-indicator';
import { TypographyText } from '@alfalab/core-components-typography';

import { INDICATOR_BG_COLOR, INDICATOR_BORDER_COLOR } from '../../consts';
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
            accentColor = 'primary',
            bgColor = 'modal-bg-primary',
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
                        [styles[accentColor]]: selected,
                    },
                )}
                onClick={handleClick}
            >
                <div className={cn(styles.icon, commonIconClassName, iconClassName)}>
                    {isValidElement(icon) ? cloneElement(icon, { selected }) : icon}
                </div>

                <TypographyText
                    weight='medium'
                    view='secondary-small'
                    className={cn(styles.label, commonLabelClassName, labelClassName, {
                        [styles.labelSelected]: selected,
                    })}
                >
                    {isValidElement(label) ? cloneElement(label, { selected }) : label}
                </TypographyText>

                {showIndicator && (
                    <div className={styles.indicator}>
                        <Indicator
                            {...indicatorProps}
                            height={indicatorProps?.value ? 16 : undefined}
                            border={{
                                width: 2,
                                color: INDICATOR_BORDER_COLOR[bgColor],
                            }}
                            backgroundColor={INDICATOR_BG_COLOR[accentColor]}
                        />
                    </div>
                )}
            </Component>
        );
    },
);

export const Tab = TabComponent as React.ForwardRefExoticComponent<
    TabProps & React.RefAttributes<HTMLElement>
>;
