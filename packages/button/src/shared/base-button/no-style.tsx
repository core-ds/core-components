import React, { type ComponentProps, forwardRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import {
    type AnchorProps,
    type ButtonProps,
} from '@alfalab/core-components-button/shared/base-button/pure-types';
import { type NoStyleButtonProps } from '@alfalab/core-components-button/shared/base-button/types';
import { DisabledContext, useCoreConfig, useDisabled } from '@alfalab/core-components-config';
import {
    passCustomProps,
    PolymorphicA,
    PolymorphicButton,
} from '@alfalab/core-components-polymorphic';

function isAnchorProps(props: NoStyleButtonProps): props is AnchorProps {
    return Boolean(props.href);
}

export const NoStyleButton = forwardRef<HTMLElement, NoStyleButtonProps>((props, ref) => {
    const {
        as: {
            a: AImplementation = PolymorphicA,
            button: ButtonImplementation = PolymorphicButton,
        } = {},
    } = useCoreConfig();
    const {
        customProps,
        as: PolymorphicComponent,
        Component = props.href ? 'a' : 'button',
        dataTestId,
        disabled: disabledFromProps,
        ...restProps
    } = props;
    const RenderComponent =
        PolymorphicComponent ??
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (Component as Extract<typeof Component, typeof PolymorphicComponent>);
    const sharedProps = { 'data-test-id': dataTestId };
    const disabled = useDisabled(disabledFromProps);
    const render = () => {
        if (isAnchorProps(restProps)) {
            const {
                target,
                rel = target === '_blank' ? 'noreferrer noopener' : undefined,
                onClick,
                className,
                disabledClassName,
                href,
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
            const hrefProps =
                RenderComponent === PolymorphicComponent || typeof Component === 'string'
                    ? { href }
                    : { to: href };

            return (
                <AImplementation
                    {...sharedProps}
                    {...restAnchorProps}
                    {...hrefProps}
                    {...passCustomProps(customProps)}
                    as={
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                        RenderComponent as Extract<
                            typeof RenderComponent,
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
                {...sharedProps}
                {...restButtonProps}
                {...passCustomProps(customProps)}
                as={
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                    RenderComponent as Extract<
                        typeof RenderComponent,
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
});
