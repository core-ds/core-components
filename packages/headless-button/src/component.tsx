import React, { type ComponentProps, type FC } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { DisabledContext, useCoreConfig, useDisabled } from '@alfalab/core-components-config';
import {
    type AnchorProps,
    type BaseButtonProps,
    type ButtonProps,
    type HeadlessButtonProps,
} from '@alfalab/core-components-headless-button/types';
import {
    passCustomProps,
    PolymorphicA,
    PolymorphicButton,
} from '@alfalab/core-components-polymorphic';

function isAnchorProps(props: BaseButtonProps): props is AnchorProps {
    return Boolean(props.href);
}

export const HeadlessButton: FC<HeadlessButtonProps> = ({
    as: Component,
    customProps: { customProps, componentProps = {} } = {},
}) => {
    const {
        as: {
            a: AImplementation = PolymorphicA,
            button: ButtonImplementation = PolymorphicButton,
        } = {},
    } = useCoreConfig();
    const { disabled: disabledFromProps, ref = null, ...restProps } = componentProps;
    const disabled = useDisabled(disabledFromProps);
    const render = () => {
        if (isAnchorProps(restProps)) {
            const {
                target,
                rel = target === '_blank' ? 'noreferrer noopener' : undefined,
                onClick,
                className,
                disabledClassName,
                ...restAnchorProps
            } = restProps;
            const handleClick: typeof onClick = (event) => {
                if (disabled) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    onClick?.(event);
                }
            };

            return (
                <AImplementation
                    {...restAnchorProps}
                    {...passCustomProps(customProps)}
                    as={
                        Component as Extract<
                            typeof Component,
                            ComponentProps<typeof PolymorphicA>['as']
                        >
                    }
                    ref={mergeRefs([ref])}
                    className={cn(className, disabled && disabledClassName)}
                    aria-disabled={disabled}
                    target={target}
                    rel={rel}
                    onClick={handleClick}
                />
            );
        }
        const buttonProps = restProps as ButtonProps;
        const { type = 'button', onClick, disabledClassName, ...restButtonProps } = buttonProps;
        const handleClick: typeof onClick = (event) => {
            if (disabled) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                onClick?.(event);
            }
        };

        return (
            <ButtonImplementation
                {...restButtonProps}
                {...passCustomProps(customProps)}
                as={
                    Component as Extract<
                        typeof Component,
                        ComponentProps<typeof PolymorphicButton>['as']
                    >
                }
                ref={mergeRefs([ref])}
                disabled={disabled}
                type={type}
                onClick={handleClick}
            />
        );
    };

    return <DisabledContext.Provider value={disabled}>{render()}</DisabledContext.Provider>;
};
