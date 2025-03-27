import React, { cloneElement, forwardRef, isValidElement, MouseEvent } from 'react';
import cn from 'classnames';

import { Indicator } from '@alfalab/core-components-indicator';
import { Text } from '@alfalab/core-components-typography';

import { INDICATOR_BG_COLOR, INDICATOR_BORDER_COLOR } from '../../consts';
import { PrivateTabProps, TabProps } from '../../types';

import styles from './index.module.css';

type TabComponentProps = PrivateTabProps & TabProps;

const TabComponent = forwardRef<HTMLElement, TabComponentProps>((props, ref) => {
    const {
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
        // Если href указан, по умолчанию используется "a", иначе "button"
        Component = href ? 'a' : 'button',
        accentColor = 'primary',
        bgColor = 'modal-bg-primary',
        ...restProps
    } = props as TabComponentProps;

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

    // Приводим Component к React.ElementType, чтобы можно было передавать дополнительные кастомные пропсы (например, selected)
    const ComponentTag = Component as React.ElementType;

    return (
        <ComponentTag
            data-test-id={dataTestId}
            tabIndex={0}
            {...(ComponentTag === 'button' ? { type: 'button' } : null)}
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
                { [styles[accentColor]]: selected },
            )}
            onClick={handleClick}
        >
            <div className={cn(styles.icon, commonIconClassName, iconClassName)}>
                {isValidElement(icon) ? cloneElement(icon, { selected }) : icon}
            </div>
            <Text
                weight='medium'
                view='secondary-small'
                className={cn(styles.label, commonLabelClassName, labelClassName, {
                    [styles.labelSelected]: selected,
                })}
            >
                {isValidElement(label) ? cloneElement(label, { selected }) : label}
            </Text>
            {showIndicator && (
                <div className={styles.indicator}>
                    <Indicator
                        {...indicatorProps}
                        height={indicatorProps?.value ? 16 : undefined}
                        border={{ width: 2, color: INDICATOR_BORDER_COLOR[bgColor] }}
                        backgroundColor={INDICATOR_BG_COLOR[accentColor]}
                    />
                </div>
            )}
        </ComponentTag>
    );
});

export const Tab: React.ForwardRefExoticComponent<
    TabComponentProps & React.RefAttributes<HTMLElement>
> = TabComponent;
