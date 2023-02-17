/* eslint-disable complexity */
import React, { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { getDataTestId } from '../../utils';

import { BackArrowAddon } from './components/back-arrow-addon';
import { Closer } from './components/closer';
import type { ContentParams, NavigationBarProps } from './types';

import styles from './index.module.css';

const ADDONS_HEIGHT = 48;

export const NavigationBar: FC<NavigationBarProps> = ({
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
    dataTestId,
    imageUrl,
    closerIcon,
    onClose,
    view,
    parentRef,
    sticky,
    onBack,
}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const bottomContentRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const mainLinePaddingTopRef = useRef<string>('0px');

    const compactTitle = view === 'mobile' && titleSize === 'compact';
    const hasLeftPart = Boolean(leftAddons || hasBackButton);
    const hasRightPart = Boolean(rightAddons || hasCloser);
    const hasContent = Boolean(title || children);
    const withAnimation = Boolean(view === 'mobile' && hasLeftPart && sticky && !compactTitle);
    const showContentOnTop = hasContent && (compactTitle || !hasLeftPart);
    const showContentOnBot = hasContent && !compactTitle && hasLeftPart;
    const showStaticContentOnTop = !withAnimation && showContentOnTop;
    const showStaticContentOnBot = !withAnimation && showContentOnBot;
    const showAnimatedContentOnTop = withAnimation && showContentOnBot && scrollTop > ADDONS_HEIGHT;
    const showAnimatedContentOnBot = withAnimation && showContentOnBot;
    const headerPaddingTop = mainLinePaddingTopRef.current;

    useEffect(() => {
        const parent = parentRef?.current;

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
    }, [parentRef, withAnimation]);

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
                    textOpacity={textOpacity}
                    view={view}
                    onClick={onBack}
                    data-test-id={getDataTestId(dataTestId, 'back-button')}
                />
            </div>
        );
    };

    const renderContent = (args: ContentParams = {}) => {
        const { extraClassName, ref, style, hidden } = args;

        return (
            <div
                style={{ ...style, visibility: hidden ? 'hidden' : 'visible' }}
                ref={ref}
                className={cn(styles.content, extraClassName, contentClassName, styles[align], {
                    [styles.trim]: trim,
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
                {compactTitle && subtitle && <div className={styles.subtitle}>{subtitle}</div>}
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
            ref={headerRef}
            className={cn(styles.header, className, { [styles.backgroundImage]: imageUrl })}
            data-test-id={getDataTestId(dataTestId)}
            style={{
                ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
                ...(withAnimation &&
                    bottomContentRef.current && { top: -bottomContentRef.current.scrollHeight }),
            }}
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
                    <div className={styles.addonsWrapper}>
                        {hasBackButton && renderBackButton()}
                        {leftAddons && (
                            <div className={cn(styles.addon, addonClassName)}>{leftAddons}</div>
                        )}
                    </div>
                )}

                {showStaticContentOnTop && renderContent()}

                {showAnimatedContentOnTop &&
                    renderContent({
                        extraClassName: styles.withBothAddons,
                        style: {
                            opacity: Math.min(1, (scrollTop - ADDONS_HEIGHT) / ADDONS_HEIGHT),
                        },
                    })}

                {hasRightPart && (
                    <div className={cn(styles.addonsWrapper, styles.rightAddons)}>
                        {rightAddons && (
                            <div className={cn(styles.addon, addonClassName)}>{rightAddons}</div>
                        )}

                        {hasCloser && renderCloser()}
                    </div>
                )}
            </div>

            {showAnimatedContentOnBot &&
                renderContent({
                    ref: bottomContentRef,
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
                <div className={cn(styles.bottomAddons, bottomAddonsClassName)}>{bottomAddons}</div>
            )}
        </div>
    );
};
