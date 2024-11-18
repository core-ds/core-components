/* eslint-disable complexity */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import type { ContentParams, NavigationBarPrivateComponentProps } from './types';

import styles from './index.module.css';

const ADDONS_HEIGHT = 48;

export const NavigationBarPrivateComponent = forwardRef<
    HTMLDivElement,
    NavigationBarPrivateComponentProps
>(
    (
        {
            addonClassName,
            className,
            contentClassName,
            closerClassName,
            leftAddons,
            rightAddons,
            bottomAddons,
            bottomAddonsClassName,
            children,
            align = 'left',
            trim = true,
            title,
            titleSize = 'default',
            subtitle,
            hasCloser,
            hasBackButton,
            backButtonClassName,
            backButtonProps,
            dataTestId,
            imageUrl,
            closerIcon,
            onClose,
            view,
            scrollableParentRef,
            sticky,
            onBack,
            BackArrowAddon,
            Closer,
        },
        ref,
    ) => {
        const [scrollTop, setScrollTop] = useState(0);
        const [titleMargin, setTitleMargin] = useState({ left: 0, right: 0 });
        const bottomContentRef = useRef<HTMLDivElement>(null);
        const headerRef = useRef<HTMLDivElement>(null);
        const mainLinePaddingTopRef = useRef<string>('0px');
        const leftAddonsRef = useRef<HTMLDivElement>(null);
        const rightAddonsRef = useRef<HTMLDivElement>(null);
        // MOBILE CASE
        const compactTitle = view === 'mobile' && titleSize === 'compact';
        const hasLeftPart = Boolean(leftAddons || hasBackButton);
        const hasRightPart = Boolean(rightAddons || hasCloser);
        const hasContent = Boolean(title || children);
        // MOBILE CASE
        const withAnimation = Boolean(view === 'mobile' && hasLeftPart && sticky && !compactTitle);
        const showContentOnTop = hasContent && (compactTitle || !hasLeftPart);
        const showContentOnBot = hasContent && !compactTitle && hasLeftPart;
        const showStaticContentOnTop = !withAnimation && showContentOnTop;
        const showStaticContentOnBot = !withAnimation && showContentOnBot;
        // MOBILE CASE
        const showAnimatedContentOnTop =
            withAnimation && showContentOnBot && scrollTop > ADDONS_HEIGHT;
        // MOBILE CASE
        const showAnimatedContentOnBot = withAnimation && showContentOnBot;
        const headerPaddingTop = mainLinePaddingTopRef.current;

        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (align === 'center' && (showStaticContentOnTop || showAnimatedContentOnTop)) {
                const leftAddonsWidth = leftAddonsRef.current?.offsetWidth || 0;
                const rightAddonsWidth = rightAddonsRef.current?.offsetWidth || 0;

                const marginSize = Math.abs(rightAddonsWidth - leftAddonsWidth);
                const shouldAddLeftMargin = rightAddonsWidth - leftAddonsWidth > 0;

                setTitleMargin((prev) => {
                    const newState = shouldAddLeftMargin
                        ? { left: marginSize, right: 0 }
                        : { left: 0, right: marginSize };

                    const isStateChanged =
                        prev.left !== newState.left || prev.right !== newState.right;

                    return isStateChanged ? newState : prev;
                });
            }
        }, [
            align,
            showStaticContentOnTop,
            showAnimatedContentOnTop,
            leftAddons,
            rightAddons,
            hasBackButton,
            hasCloser,
        ]);

        useEffect(() => {
            const parent = scrollableParentRef?.current;

            const handleScroll = (ev: Event) => {
                const divElement = ev.target as HTMLDivElement;

                setScrollTop(divElement.scrollTop);
            };

            // MOBILE CASE
            if (withAnimation && headerRef.current) {
                mainLinePaddingTopRef.current = getComputedStyle(headerRef.current).paddingTop;
            }

            // MOBILE CASE
            if (withAnimation && parent) {
                parent.addEventListener('scroll', handleScroll);
            }

            return () => parent?.removeEventListener('scroll', handleScroll);
        }, [scrollableParentRef, withAnimation]);

        const renderBackButton = () => {
            let textOpacity = 1;

            // MOBILE CASE
            if (withAnimation) {
                const height = hasContent ? ADDONS_HEIGHT : ADDONS_HEIGHT / 2;

                textOpacity = Math.max(0, 1 - scrollTop / height);
            }
            // MOBILE CASE
            else if (compactTitle) {
                textOpacity = 0;
            }

            return (
                <div className={cn(styles.addon, backButtonClassName)}>
                    <BackArrowAddon
                        data-test-id={getDataTestId(dataTestId, 'back-button')}
                        {...backButtonProps}
                        textOpacity={textOpacity}
                        onClick={onBack}
                    />
                </div>
            );
        };

        const renderContent = (args: ContentParams = {}) => {
            const { extraClassName, wrapperRef, style, hidden } = args;

            return (
                <div
                    style={{ ...style, visibility: hidden ? 'hidden' : 'visible' }}
                    ref={wrapperRef}
                    className={cn(styles.content, extraClassName, contentClassName, styles[align], {
                        [styles.trim]: trim,
                        // MOBILE CASE
                        [styles.withCompactTitle]: view === 'mobile' && compactTitle && hasContent,
                    })}
                    aria-hidden={hidden}
                >
                    {children && <div className={styles.children}>{children}</div>}
                    {title && (
                        <div
                            className={styles.title}
                            data-test-id={hidden ? undefined : getDataTestId(dataTestId, 'title')}
                        >
                            {title}
                        </div>
                    )}
                    {
                        // MOBILE CASE
                        compactTitle && subtitle && (
                            <div className={styles.subtitle}>{subtitle}</div>
                        )
                    }
                </div>
            );
        };

        const renderCloser = () => (
            <div className={cn(styles.addon, styles.closer, closerClassName)}>
                <Closer
                    icon={closerIcon}
                    dataTestId={getDataTestId(dataTestId, 'closer')}
                    onClose={onClose}
                />
            </div>
        );

        return (
            <div
                ref={mergeRefs([ref, headerRef])}
                className={cn(styles.header, className, { [styles.backgroundImage]: imageUrl })}
                data-test-id={getDataTestId(dataTestId)}
                style={{
                    ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
                    // MOBILE CASE
                    ...(withAnimation &&
                        bottomContentRef.current && {
                            top: -bottomContentRef.current.scrollHeight,
                        }),
                }}
            >
                <div
                    className={cn(styles.mainLine, {
                        // MOBILE CASE
                        [styles.mainLineSticky]: withAnimation,
                        [styles.mainLineWithImageBg]: imageUrl,
                    })}
                    style={{
                        // MOBILE CASE
                        ...(withAnimation
                            ? {
                                  marginTop: `-${headerPaddingTop}`,
                                  paddingTop: headerPaddingTop,
                              }
                            : null),
                    }}
                >
                    {hasLeftPart && (
                        <div className={styles.addonsWrapper} ref={leftAddonsRef}>
                            {hasBackButton && renderBackButton()}
                            {leftAddons && (
                                <div className={cn(styles.addon, addonClassName)}>{leftAddons}</div>
                            )}
                        </div>
                    )}

                    {showStaticContentOnTop &&
                        renderContent({
                            ...(align === 'center'
                                ? {
                                      style: {
                                          marginLeft: titleMargin.left,
                                          marginRight: titleMargin.right,
                                      },
                                  }
                                : null),
                        })}

                    {
                        // MOBILE CASE
                        showAnimatedContentOnTop &&
                            renderContent({
                                extraClassName: styles.withBothAddons,
                                style: {
                                    opacity: Math.min(
                                        1,
                                        (scrollTop - ADDONS_HEIGHT) / ADDONS_HEIGHT,
                                    ),
                                    ...(align === 'center'
                                        ? {
                                              marginLeft: titleMargin.left,
                                              marginRight: titleMargin.right,
                                          }
                                        : null),
                                },
                            })
                    }

                    {hasRightPart && (
                        <div
                            className={cn(styles.addonsWrapper, styles.rightAddons)}
                            ref={rightAddonsRef}
                        >
                            {rightAddons && (
                                <div className={cn(styles.addon, addonClassName)}>
                                    {rightAddons}
                                </div>
                            )}

                            {hasCloser && renderCloser()}
                        </div>
                    )}
                </div>

                {
                    // MOBILE CASE
                    showAnimatedContentOnBot &&
                        renderContent({
                            wrapperRef: bottomContentRef,
                            extraClassName: styles.underAddons,
                            style: { opacity: Math.max(0, 1 - scrollTop / ADDONS_HEIGHT) },
                            hidden: scrollTop / ADDONS_HEIGHT > 1,
                        })
                }

                {showStaticContentOnBot &&
                    renderContent({
                        extraClassName: cn({
                            // DESKTOP CASE
                            [styles.contentOnBotDesktop]: view === 'desktop',
                            // MOBILE CASE
                            [styles.contentOnBotMobile]: view === 'mobile',
                        }),
                    })}

                {bottomAddons && (
                    <div className={cn(styles.bottomAddons, bottomAddonsClassName)}>
                        {bottomAddons}
                    </div>
                )}
            </div>
        );
    },
);

NavigationBarPrivateComponent.displayName = 'NavigationBarPrivate';
