/* eslint-disable complexity */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { BackArrowAddon } from './components/back-arrow-addon';
import { Closer } from './components/closer';
import type { ContentParams, NavigationBarPrivateProps } from './types';

import styles from './index.module.css';

const ADDONS_HEIGHT = 48;

export const NavigationBarPrivate = forwardRef<HTMLDivElement, NavigationBarPrivateProps>(
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
            dataName,
            titleClassName,
            titleRef,
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

        const compactTitle = view === 'mobile' && titleSize === 'compact';
        const hasLeftPart = Boolean(leftAddons || hasBackButton);
        const hasRightPart = Boolean(rightAddons || hasCloser);
        const hasContent = Boolean(title || children);
        const withAnimation = Boolean(view === 'mobile' && hasLeftPart && sticky && !compactTitle);
        const showContentOnTop = hasContent && (compactTitle || !hasLeftPart);
        const showContentOnBot = hasContent && !compactTitle && hasLeftPart;
        const showStaticContentOnTop = !withAnimation && showContentOnTop;
        const showStaticContentOnBot = !withAnimation && showContentOnBot;
        const showAnimatedContentOnTop =
            withAnimation && showContentOnBot && scrollTop > ADDONS_HEIGHT;
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

            if (withAnimation && headerRef.current) {
                mainLinePaddingTopRef.current = getComputedStyle(headerRef.current).paddingTop;
            }

            if (withAnimation && parent) {
                parent.addEventListener('scroll', handleScroll);
            }

            return () => parent?.removeEventListener('scroll', handleScroll);
        }, [scrollableParentRef, withAnimation]);

        const renderBackButton = () => {
            let textOpacity = 1;

            if (withAnimation) {
                const height = hasContent ? ADDONS_HEIGHT : ADDONS_HEIGHT / 2;

                textOpacity = Math.max(0, 1 - scrollTop / height);
            } else if (compactTitle) {
                textOpacity = 0;
            }

            return (
                <div className={cn(styles.addon, backButtonClassName)}>
                    <BackArrowAddon
                        data-test-id={getDataTestId(dataTestId, 'back-button')}
                        {...backButtonProps}
                        textOpacity={textOpacity}
                        view={view}
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
                        [styles.withCompactTitle]: view === 'mobile' && compactTitle && hasContent,
                    })}
                    aria-hidden={hidden}
                >
                    {children && <div className={styles.children}>{children}</div>}
                    {title && (
                        <div
                            className={cn(styles.title, titleClassName)}
                            data-test-id={hidden ? undefined : getDataTestId(dataTestId, 'title')}
                            ref={titleRef}
                        >
                            {title}
                        </div>
                    )}
                    {compactTitle && subtitle && (
                        <div
                            className={styles.subtitle}
                            data-test-id={getDataTestId(dataTestId, 'subtitle')}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
            );
        };

        const renderCloser = () => (
            <div className={cn(styles.addon, styles.closer, closerClassName)}>
                <Closer
                    view={view}
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
                    ...(withAnimation &&
                        bottomContentRef.current && {
                            top: -bottomContentRef.current.scrollHeight,
                        }),
                }}
                data-name={dataName}
            >
                <div
                    className={cn(styles.mainLine, {
                        [styles.mainLineSticky]: withAnimation,
                        [styles.mainLineWithImageBg]: imageUrl,
                    })}
                    style={{
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

                    {showAnimatedContentOnTop &&
                        renderContent({
                            extraClassName: styles.withBothAddons,
                            style: {
                                opacity: Math.min(1, (scrollTop - ADDONS_HEIGHT) / ADDONS_HEIGHT),
                                ...(align === 'center'
                                    ? {
                                          marginLeft: titleMargin.left,
                                          marginRight: titleMargin.right,
                                      }
                                    : null),
                            },
                        })}

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

                {showAnimatedContentOnBot &&
                    renderContent({
                        wrapperRef: bottomContentRef,
                        extraClassName: styles.underAddons,
                        style: { opacity: Math.max(0, 1 - scrollTop / ADDONS_HEIGHT) },
                        hidden: scrollTop / ADDONS_HEIGHT > 1,
                    })}

                {showStaticContentOnBot &&
                    renderContent({
                        extraClassName: cn({
                            [styles.contentOnBotDesktop]: view === 'desktop',
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

NavigationBarPrivate.displayName = 'NavigationBarPrivate';
