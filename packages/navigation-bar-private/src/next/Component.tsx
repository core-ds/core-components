/* eslint-disable complexity */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { BackArrowAddon } from '../components/back-arrow-addon';
import { Closer } from '../components/closer';
import { type ContentParams } from '../types';

import { getUniversalModalTitleMargin } from './get-title-margin';
import { type NavigationBarPrivateNextProps } from './types';

import styles from './index.module.css';

const ADDONS_HEIGHT = 48;

/**
 * Копия `NavigationBarPrivate` с компенсацией отступов заголовка,
 * зашитой под конкретного потребителя — мобильную шапку `universal-modal`
 * (см. `getUniversalModalTitleMargin`). Не предназначен для использования
 * другими компонентами.
 */
export const NavigationBarPrivateNext = forwardRef<HTMLDivElement, NavigationBarPrivateNextProps>(
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
            mainAlign = 'relative',
            trim = true,
            title,
            subtitle,
            subtitleClassName,
            hasCloser,
            closerProps = {},
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
            colors = 'default',
        },
        ref,
    ) => {
        const textAlign = mainAlign === 'left' ? 'left' : 'center';

        const [scrollTop, setScrollTop] = useState(0);
        const [titleMargin, setTitleMargin] = useState({ left: 0, right: 0 });
        const [mainLineMargin, setMainLineMargin] = useState<{
            left?: number;
            right?: number;
        }>({});
        const bottomContentRef = useRef<HTMLDivElement>(null);
        const headerRef = useRef<HTMLDivElement>(null);
        const mainLinePaddingTopRef = useRef<string>('0px');
        const leftAddonsRef = useRef<HTMLDivElement>(null);
        const rightAddonsRef = useRef<HTMLDivElement>(null);

        const isMobile = view === 'mobile';

        const hasLeftPart = Boolean(leftAddons || hasBackButton);
        const hasRightPart = Boolean(rightAddons || hasCloser);
        const hasContent = Boolean(title || children);
        const withAnimation = Boolean(isMobile && hasLeftPart && sticky);
        const showContentOnBot =
            hasContent && hasLeftPart && (mainAlign === 'left' || withAnimation);
        const showContentOnTop = hasContent && !showContentOnBot;
        const showStaticContentOnTop = !withAnimation && showContentOnTop;
        const showStaticContentOnBot = !withAnimation && showContentOnBot;
        const showAnimatedContentOnTop =
            withAnimation && showContentOnBot && scrollTop > ADDONS_HEIGHT;
        const showAnimatedContentOnBot = withAnimation && showContentOnBot;
        const headerPaddingTop = mainLinePaddingTopRef.current;

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const { contentMargin, mainLineMargin: nextMainLineMargin } =
                getUniversalModalTitleMargin({
                    mainAlign,
                    hasBackButton: Boolean(hasBackButton),
                    hasCloser: Boolean(hasCloser),
                    hasLeftAddons: Boolean(leftAddons),
                    hasRightAddons: Boolean(rightAddons),
                    leftAddonsWidth: leftAddonsRef.current?.offsetWidth || 0,
                    rightAddonsWidth: rightAddonsRef.current?.offsetWidth || 0,
                });

            setTitleMargin((prev) => {
                const isStateChanged =
                    prev.left !== contentMargin.left || prev.right !== contentMargin.right;

                return isStateChanged ? contentMargin : prev;
            });

            setMainLineMargin((prev) => {
                const next = nextMainLineMargin ?? {};
                const isStateChanged = prev.left !== next.left || prev.right !== next.right;

                return isStateChanged ? next : prev;
            });
        }, [
            mainAlign,
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
            }

            return (
                <div className={cn(styles.addon, backButtonClassName)}>
                    <BackArrowAddon
                        data-test-id={getDataTestId(dataTestId, 'back-button')}
                        {...backButtonProps}
                        colors={colors}
                        textOpacity={textOpacity}
                        view={view}
                        onClick={onBack}
                    />
                </div>
            );
        };

        const renderContent = (args: ContentParams = {}) => {
            const { extraClassName, wrapperRef, style, hidden, extraAlign } = args;

            return (
                <div
                    style={{ ...style, visibility: hidden ? 'hidden' : 'visible' }}
                    ref={wrapperRef}
                    className={cn(
                        styles.content,
                        extraClassName,
                        contentClassName,
                        styles[extraAlign || textAlign],
                        {
                            [styles.trim]: trim,
                        },
                    )}
                    aria-hidden={hidden}
                >
                    {children && <div className={styles.children}>{children}</div>}
                    {title && (
                        <div
                            className={cn(styles.title, titleClassName)}
                            data-test-id={hidden ? undefined : getDataTestId(dataTestId, 'title')}
                            ref={titleRef}
                        >
                            <div className={styles.titleTextContent}>{title}</div>
                        </div>
                    )}
                    {subtitle && (
                        <div
                            className={cn(styles.subtitle, subtitleClassName)}
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
                    colors={colors}
                    dataTestId={getDataTestId(dataTestId, 'closer')}
                    onClose={onClose}
                    {...closerProps}
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
                        marginLeft: mainLineMargin.left,
                        marginRight: mainLineMargin.right,
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
                            ...(mainAlign !== 'left' && {
                                extraClassName: styles.showStaticContentOnTop,
                            }),
                            style: {
                                marginLeft: titleMargin.left,
                                marginRight: titleMargin.right,
                            },
                        })}

                    {showAnimatedContentOnTop &&
                        renderContent({
                            extraClassName: styles.withBothAddons,
                            style: {
                                opacity: Math.min(1, (scrollTop - ADDONS_HEIGHT) / ADDONS_HEIGHT),
                                marginLeft: titleMargin.left,
                                marginRight: titleMargin.right,
                            },
                            extraAlign: 'center',
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
                        extraAlign: 'left',
                    })}

                {showStaticContentOnBot &&
                    renderContent({
                        extraClassName: cn({
                            [styles.contentOnBotDesktop]: view === 'desktop',
                            [styles.contentOnBotMobile]: isMobile,
                        }),
                        extraAlign: 'left',
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

NavigationBarPrivateNext.displayName = 'NavigationBarPrivateNext';
