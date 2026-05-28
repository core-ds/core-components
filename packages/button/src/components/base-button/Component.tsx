/* eslint-disable complexity */
import React, {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { Spinner } from '@alfalab/core-components-spinner';
import { useFocus } from '@alfalab/hooks';

import { LOADER_MIN_DISPLAY_INTERVAL } from '../../constants/loader-min-display-interval';
import { useSpringAnimation } from '../../hooks';
import { type CommonButtonProps, type PrivateButtonProps } from '../../typings';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const BaseButton = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CommonButtonProps & PrivateButtonProps
>(
    (
        {
            allowBackdropBlur,
            children,
            view = 'secondary',
            shape = 'rectangular',
            textResizing = 'hug',
            hint,
            leftAddons,
            rightAddons,
            size = 56,
            block = false,
            className,
            spinnerClassName,
            dataTestId,
            href,
            loading = false,
            nowrap = false,
            colors = 'default',
            Component = href ? 'a' : 'button',
            onClick,
            styles = {},
            colorStylesMap = { default: {}, inverted: {} },
            shake = false,
            shakeSpring,
            pulse = false,
            pulseSpring,
            bounce = false,
            bounceSpring,
            wobble = false,
            wobbleSpring,
            jelly = false,
            jellySpring,
            swing = false,
            swingSpring,
            pop = false,
            popSpring,
            nod = false,
            nodSpring,
            rubber = false,
            rubberSpring,
            onSpringAnimationStart,
            onSpringAnimationEnd,
            ...restProps
        },
        ref,
    ) => {
        const buttonRef = useRef<HTMLElement>(null);

        const [focused] = useFocus(buttonRef, 'keyboard');

        const [loaderTimePassed, setLoaderTimePassed] = useState(true);
        const timerId = useRef(0);
        const showLoader = loading || !loaderTimePassed;

        const animationCallbacks = { onStart: onSpringAnimationStart, onEnd: onSpringAnimationEnd };

        const shakeAnim = useSpringAnimation(buttonRef, 'shake', shakeSpring, animationCallbacks);
        const pulseAnim = useSpringAnimation(buttonRef, 'pulse', pulseSpring, animationCallbacks);
        const bounceAnim = useSpringAnimation(
            buttonRef,
            'bounce',
            bounceSpring,
            animationCallbacks,
        );
        const wobbleAnim = useSpringAnimation(
            buttonRef,
            'wobble',
            wobbleSpring,
            animationCallbacks,
        );
        const jellyAnim = useSpringAnimation(buttonRef, 'jelly', jellySpring, animationCallbacks);
        const swingAnim = useSpringAnimation(buttonRef, 'swing', swingSpring, animationCallbacks);
        const popAnim = useSpringAnimation(buttonRef, 'pop', popSpring, animationCallbacks);
        const nodAnim = useSpringAnimation(buttonRef, 'nod', nodSpring, animationCallbacks);
        const rubberAnim = useSpringAnimation(
            buttonRef,
            'rubber',
            rubberSpring,
            animationCallbacks,
        );

        const showHint = hint && [56, 64, 72].includes(size);
        const iconOnly = !children;
        const sizeStyle = `size-${size}`;

        const componentProps = {
            className: cn(
                commonStyles.component,
                commonStyles[view],
                commonStyles[sizeStyle],
                commonStyles[textResizing],
                shape === 'rectangular' && styles[sizeStyle],
                shape === 'rounded' && commonStyles[shape],
                colorStyles[colors].component,
                colorStyles[colors][view],
                colorStylesMap[colors].component,
                {
                    [commonStyles.allowBackdropBlur]: allowBackdropBlur,
                    [colorStylesMap[colors][view]]: Boolean(colorStylesMap[colors][view]),
                    [commonStyles.focused]: focused,
                    [commonStyles.block]: block,
                    [commonStyles.iconOnly]: iconOnly,
                    [commonStyles.loading]: showLoader,
                    [commonStyles.withRightAddons]: Boolean(rightAddons) && !iconOnly,
                    [commonStyles.withLeftAddons]: Boolean(leftAddons) && !iconOnly,
                    [colorStyles[colors].loading]: showLoader,
                    [colorStylesMap[colors].loading]: showLoader,
                },
                className,
            ),
            'data-test-id': dataTestId || null,
        };

        const {
            disabled,
            type = 'button',
            ...restButtonProps
        } = restProps as ButtonHTMLAttributes<HTMLButtonElement>;

        const buttonChildren = (
            <React.Fragment>
                {leftAddons && <span className={commonStyles.addons}>{leftAddons}</span>}
                {children && (
                    <span
                        className={cn(commonStyles.label, {
                            [commonStyles.nowrap]: nowrap,
                            [commonStyles.stretchText]:
                                !(leftAddons || rightAddons) || textResizing === 'fill',
                        })}
                    >
                        {children}
                        {showHint && (
                            <span
                                className={cn(
                                    commonStyles.hint,
                                    colorStylesMap[colors].hint,
                                    colorStyles[colors].hint,
                                )}
                            >
                                {hint}
                            </span>
                        )}
                    </span>
                )}

                {showLoader && (
                    <Spinner
                        preset={24}
                        dataTestId={getDataTestId(dataTestId, 'loader')}
                        visible={true}
                        className={cn(
                            commonStyles.loader,
                            colorStyles[colors].loader,
                            colorStylesMap[colors].loader,
                            spinnerClassName,
                        )}
                    />
                )}

                {rightAddons && <span className={commonStyles.addons}>{rightAddons}</span>}
            </React.Fragment>
        );

        useEffect(() => {
            if (loading) {
                setLoaderTimePassed(false);

                timerId.current = window.setTimeout(() => {
                    setLoaderTimePassed(true);
                }, LOADER_MIN_DISPLAY_INTERVAL);
            }
        }, [loading]);

        useEffect(
            () => () => {
                window.clearTimeout(timerId.current);
            },
            [],
        );

        const handleClick = (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
                React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => {
            if (disabled || showLoader) {
                e.preventDefault();
                e.stopPropagation();

                return;
            }
            onClick?.(e);
            if (shake) shakeAnim.trigger();
            else if (pulse) pulseAnim.trigger();
            else if (bounce) bounceAnim.trigger();
            else if (wobble) wobbleAnim.trigger();
            else if (jelly) jellyAnim.trigger();
            else if (swing) swingAnim.trigger();
            else if (pop) popAnim.trigger();
            else if (nod) nodAnim.trigger();
            else if (rubber) rubberAnim.trigger();
        };

        if (href) {
            const { target } = restProps as AnchorHTMLAttributes<HTMLAnchorElement>;

            // Для совместимости с react-router-dom, меняем href на to
            const hrefProps = { [typeof Component === 'string' ? 'href' : 'to']: href };

            return (
                <Component
                    rel={target === '_blank' ? 'noreferrer noopener' : undefined}
                    {...componentProps}
                    {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
                    {...hrefProps}
                    onClick={handleClick}
                    disabled={disabled || showLoader}
                    ref={mergeRefs([buttonRef, ref])}
                >
                    {buttonChildren}
                </Component>
            );
        }

        return (
            <Component
                {...componentProps}
                {...restButtonProps}
                onClick={handleClick}
                type={type}
                disabled={disabled || showLoader}
                ref={mergeRefs([buttonRef, ref])}
            >
                {buttonChildren}
            </Component>
        );
    },
);
