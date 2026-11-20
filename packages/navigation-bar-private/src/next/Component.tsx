/* eslint-disable complexity */
import React, { type CSSProperties, forwardRef, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';
import { ChevronLeftLine24Icon } from '@alfalab/icons-glyph-26/ChevronLeftLine24Icon';

import { BackArrowAddon } from '../components/back-arrow-addon';
import { Closer } from '../components/closer';
import { type ContentParams } from '../types';

import { getUniversalModalTitleMargin } from './get-title-margin';
import { type NavigationBarPrivateNextProps } from './types';

import styles from './index.module.css';

const ADDONS_HEIGHT = 48;

const getImageSizeStyle = (
    image: NavigationBarPrivateNextProps['image'],
): CSSProperties | undefined =>
    image && {
        aspectRatio: image.aspectRatio?.toString(),
        minHeight: image.height,
    };

/*
 * TODO выделить общее ядро с NavigationBarPrivate
 * TODO максимально закрыть типизацию
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
            headerMode = 'relative',
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
            image,
            closerIcon,
            onClose,
            view,
            scrollableParentRef,
            onBack,
            dataName,
            titleClassName,
            titleRef,
            colors = 'default',
        },
        ref,
    ) => {
        const textAlign = headerMode === 'left' ? 'left' : 'center';

        const [scrollTop, setScrollTop] = useState(0);
        const [collapseDistance, setCollapseDistance] = useState(0);
        const [navReachScrollTop, setNavReachScrollTop] = useState(0);
        const [inlineExitDistance, setInlineExitDistance] = useState(0);
        const [inlineCollapseDistance, setInlineCollapseDistance] = useState(0);
        const [bottomContentHeight, setBottomContentHeight] = useState(0);
        const [centeredContentExtra, setCenteredContentExtra] = useState(0);
        const [centeredInset, setCenteredInset] = useState(0);
        const [titleMargin, setTitleMargin] = useState({ left: 0, right: 0 });
        const [mainLineMargin, setMainLineMargin] = useState<{
            left?: number;
            right?: number;
        }>({});
        const bottomContentRef = useRef<HTMLDivElement>(null);
        const centeredContentRef = useRef<HTMLDivElement>(null);
        const headerRef = useRef<HTMLDivElement>(null);
        const mainLineRef = useRef<HTMLDivElement>(null);
        const imageUnderRef = useRef<HTMLDivElement>(null);
        const inlineContentRef = useRef<HTMLDivElement>(null);
        const mainLinePaddingTopRef = useRef<string>('0px');
        const leftAddonsRef = useRef<HTMLDivElement>(null);
        const rightAddonsRef = useRef<HTMLDivElement>(null);

        const isMobile = view === 'mobile';

        const hasLeftPart = Boolean(leftAddons || hasBackButton);
        const hasRightPart = Boolean(rightAddons || hasCloser);
        const hasContent = Boolean(title || children);
        const isContentUnderImage = image?.contentPlacement === 'under';
        const withImageCollapse = Boolean(image);
        const withAnimation = Boolean(
            isMobile && hasLeftPart && headerMode === 'left' && !withImageCollapse,
        );
        const withTitleCollapse = Boolean(
            isMobile && isContentUnderImage && hasContent && headerMode === 'left',
        );
        const withContentCollapse = withAnimation || withTitleCollapse;
        const withInlineCollapse = Boolean(
            isMobile && hasContent && !hasLeftPart && headerMode === 'left' && !withImageCollapse,
        );
        const isInlineContentGone =
            withInlineCollapse && inlineExitDistance > 0 && scrollTop >= inlineExitDistance;
        const showContentOnBot =
            hasContent && (isContentUnderImage || (hasLeftPart && headerMode === 'left'));
        const showContentOnTop = hasContent && !showContentOnBot;
        const showStaticContentOnTop = !withContentCollapse && showContentOnTop;
        const showStaticContentOnBot = !withContentCollapse && showContentOnBot;
        const titleCollapseStart = withTitleCollapse
            ? Math.max(0, navReachScrollTop - ADDONS_HEIGHT)
            : 0;
        const titleScrollTop = scrollTop - titleCollapseStart;
        const bottomContentCollapseDistance = Math.max(
            0,
            bottomContentHeight - centeredContentExtra,
        );
        const titleFadeDistance = withAnimation
            ? Math.max(ADDONS_HEIGHT, bottomContentCollapseDistance)
            : ADDONS_HEIGHT;
        const showAnimatedContentOnTop =
            withContentCollapse && showContentOnBot && titleScrollTop > titleFadeDistance;
        const showAnimatedContentOnBot = withContentCollapse && showContentOnBot;
        const withCenteredContent = showAnimatedContentOnBot || withInlineCollapse;
        const centeredContentProgress = withInlineCollapse
            ? scrollTop - inlineExitDistance
            : titleScrollTop - titleFadeDistance;
        const showCenteredContent = withInlineCollapse
            ? isInlineContentGone
            : showAnimatedContentOnTop;
        const inlineClipDistance = Math.max(0, inlineCollapseDistance - centeredContentExtra);
        const headerPaddingTop = mainLinePaddingTopRef.current;
        const imageFadeDistance = isContentUnderImage ? navReachScrollTop : collapseDistance;
        const imageOpacity =
            withImageCollapse && imageFadeDistance > 0
                ? Math.max(0, 1 - scrollTop / imageFadeDistance)
                : 1;
        const collapsingStyle =
            withImageCollapse && !isContentUnderImage ? { opacity: imageOpacity } : undefined;
        const isNavigationFilled =
            isContentUnderImage && navReachScrollTop > 0 && scrollTop >= navReachScrollTop;

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const leftAddonsWidth = leftAddonsRef.current?.offsetWidth || 0;
            const rightAddonsWidth = rightAddonsRef.current?.offsetWidth || 0;

            const { contentMargin, mainLineMargin: nextMainLineMargin } =
                getUniversalModalTitleMargin({
                    headerMode,
                    hasBackButton: Boolean(hasBackButton),
                    hasCloser: Boolean(hasCloser),
                    hasLeftAddons: Boolean(leftAddons),
                    hasRightAddons: Boolean(rightAddons),
                    leftAddonsWidth,
                    rightAddonsWidth,
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

            setCenteredInset(Math.max(leftAddonsWidth, rightAddonsWidth));
        }, [headerMode, showStaticContentOnTop, leftAddons, rightAddons, hasBackButton, hasCloser]);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const header = headerRef.current;
            const mainLine = mainLineRef.current;

            if (!withImageCollapse || !header || !mainLine) return undefined;

            const measure = () => {
                const paddingTop = parseFloat(getComputedStyle(header).paddingTop) || 0;
                const navigationBottom = paddingTop + mainLine.offsetHeight;
                const imageUnder = imageUnderRef.current;

                setCollapseDistance(Math.max(0, header.offsetHeight - navigationBottom));
                setNavReachScrollTop(
                    imageUnder
                        ? Math.max(
                              0,
                              imageUnder.offsetTop + imageUnder.offsetHeight - navigationBottom,
                          )
                        : 0,
                );
            };

            measure();

            if (typeof ResizeObserver === 'undefined') return undefined;

            const observer = new ResizeObserver(measure);

            observer.observe(header);

            return () => observer.disconnect();
        }, [withImageCollapse, isContentUnderImage]);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const mainLine = mainLineRef.current;
            const content = inlineContentRef.current;

            if (!withInlineCollapse || !mainLine || !content) return undefined;

            const measure = () => {
                setInlineExitDistance(
                    mainLine.offsetTop + content.offsetTop + content.offsetHeight,
                );
                setInlineCollapseDistance(Math.max(0, mainLine.offsetHeight - ADDONS_HEIGHT));
            };

            measure();

            if (typeof ResizeObserver === 'undefined') return undefined;

            const observer = new ResizeObserver(measure);

            observer.observe(content);

            return () => observer.disconnect();
        }, [withInlineCollapse]);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const content = bottomContentRef.current;

            if (!withAnimation || !content) return undefined;

            const measure = () => setBottomContentHeight(content.offsetHeight);

            measure();

            if (typeof ResizeObserver === 'undefined') return undefined;

            const observer = new ResizeObserver(measure);

            observer.observe(content);

            return () => observer.disconnect();
        }, [withAnimation, showAnimatedContentOnBot]);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const content = centeredContentRef.current;

            if (!withCenteredContent || !content) return undefined;

            const measure = () =>
                setCenteredContentExtra(Math.max(0, content.offsetHeight - ADDONS_HEIGHT));

            measure();

            if (typeof ResizeObserver === 'undefined') return undefined;

            const observer = new ResizeObserver(measure);

            observer.observe(content);

            return () => observer.disconnect();
        }, [withCenteredContent]);

        useEffect(() => {
            const parent = scrollableParentRef?.current;
            const titleCollapseEnd = withTitleCollapse ? titleCollapseStart + ADDONS_HEIGHT * 2 : 0;
            let maxScrollTop = titleFadeDistance + ADDONS_HEIGHT;

            if (withImageCollapse) {
                maxScrollTop = Math.max(collapseDistance, titleCollapseEnd);
            } else if (withInlineCollapse) {
                maxScrollTop = inlineExitDistance + ADDONS_HEIGHT;
            }

            const handleScroll = (ev: Event) => {
                const divElement = ev.target as HTMLDivElement;

                setScrollTop(Math.min(Math.max(divElement.scrollTop, 0), maxScrollTop));
            };

            if (withAnimation && headerRef.current) {
                mainLinePaddingTopRef.current = getComputedStyle(headerRef.current).paddingTop;
            }

            if ((withAnimation || withImageCollapse || withInlineCollapse) && parent) {
                parent.addEventListener('scroll', handleScroll);
            }

            return () => parent?.removeEventListener('scroll', handleScroll);
        }, [
            scrollableParentRef,
            withAnimation,
            withImageCollapse,
            withTitleCollapse,
            withInlineCollapse,
            collapseDistance,
            titleCollapseStart,
            inlineExitDistance,
            titleFadeDistance,
        ]);

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
                        text={null}
                        {...backButtonProps}
                        className={cn(styles.backButtonClassName, backButtonProps?.className)}
                        colors={colors}
                        textOpacity={textOpacity}
                        view={view}
                        onClick={onBack}
                        icon={ChevronLeftLine24Icon}
                        size={40}
                        iconWrapperClassName={styles.backButtonIconClassName}
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
                    className={cn(styles.closeButtonWrapperClassName, closerProps.className)}
                    size={40}
                    buttonClassName={styles.closeButtonClassName}
                />
            </div>
        );

        return (
            <div
                ref={mergeRefs([ref, headerRef])}
                className={cn(styles.header, className, {
                    [styles.withInlineCollapse]: withInlineCollapse,
                    [styles.withImage]: image,
                    [styles.withContentUnderImage]: isContentUnderImage,
                })}
                data-test-id={getDataTestId(dataTestId)}
                style={{
                    ...(!isContentUnderImage && getImageSizeStyle(image)),
                    ...(withImageCollapse && { top: -collapseDistance }),
                    ...(withInlineCollapse &&
                        inlineClipDistance > 0 && {
                            clipPath: `inset(0 0 ${Math.min(scrollTop, inlineClipDistance)}px 0)`,
                        }),
                    ...(withAnimation && { top: -bottomContentCollapseDistance }),
                }}
                data-name={dataName}
            >
                {image && !isContentUnderImage && (
                    <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${image.src})`, opacity: imageOpacity }}
                        aria-hidden={true}
                    />
                )}
                <div
                    ref={mainLineRef}
                    className={cn(styles.mainLine, {
                        [styles.mainLineInlineCollapse]: withInlineCollapse,
                        [styles.mainLineSticky]: withAnimation || withImageCollapse,
                        [styles.mainLineWithImageBg]: image && !isNavigationFilled,
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
                            ...(headerMode !== 'left' && {
                                extraClassName: styles.showStaticContentOnTop,
                            }),
                            ...(withInlineCollapse && {
                                wrapperRef: inlineContentRef,
                                hidden: isInlineContentGone,
                            }),
                            style: {
                                ...collapsingStyle,
                                ...(withInlineCollapse && {
                                    transform: `translateY(${-Math.min(scrollTop, inlineExitDistance)}px)`,
                                }),
                                marginLeft: titleMargin.left,
                                marginRight: titleMargin.right,
                            },
                        })}

                    {withCenteredContent &&
                        renderContent({
                            wrapperRef: centeredContentRef,
                            extraClassName: cn(styles.withBothAddons, styles.centeredContent),
                            style: {
                                opacity: Math.min(
                                    1,
                                    Math.max(0, centeredContentProgress) / ADDONS_HEIGHT,
                                ),
                                top: withAnimation ? headerPaddingTop : undefined,
                                left: centeredInset,
                                right: centeredInset,
                            },
                            hidden: !showCenteredContent,
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

                {image && isContentUnderImage && (
                    <div
                        ref={imageUnderRef}
                        className={styles.imageUnder}
                        style={{
                            ...getImageSizeStyle(image),
                            backgroundImage: `url(${image.src})`,
                            opacity: imageOpacity,
                        }}
                        aria-hidden={true}
                    />
                )}

                {showAnimatedContentOnBot &&
                    renderContent({
                        wrapperRef: bottomContentRef,
                        extraClassName: styles.underAddons,
                        style: {
                            opacity: Math.max(
                                0,
                                1 - Math.max(0, titleScrollTop) / titleFadeDistance,
                            ),
                        },
                        hidden: titleScrollTop > titleFadeDistance,
                        extraAlign: 'left',
                    })}

                {showStaticContentOnBot &&
                    renderContent({
                        extraClassName: cn({
                            [styles.contentOnBotDesktop]: view === 'desktop',
                        }),
                        style: collapsingStyle,
                        extraAlign: isContentUnderImage ? undefined : 'left',
                    })}

                {bottomAddons && (
                    <div
                        className={cn(styles.bottomAddons, bottomAddonsClassName)}
                        style={collapsingStyle}
                    >
                        {bottomAddons}
                    </div>
                )}
            </div>
        );
    },
);

NavigationBarPrivateNext.displayName = 'NavigationBarPrivateNext';
