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
const NAVIGATION_BOTTOM_GAP = 8;

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
        const [scrollingImageHeight, setScrollingImageHeight] = useState(0);
        const [collapseDistance, setCollapseDistance] = useState(0);
        const [navReachScrollTop, setNavReachScrollTop] = useState(0);
        const [clipExitDistance, setClipExitDistance] = useState(0);
        const [clipHeaderExcess, setClipHeaderExcess] = useState(0);
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
        const stickyNavigationRef = useRef<HTMLDivElement>(null);
        const imageUnderRef = useRef<HTMLDivElement>(null);
        const clipContentRef = useRef<HTMLDivElement>(null);
        const mainLinePaddingTopRef = useRef<string>('0px');
        const leftAddonsRef = useRef<HTMLDivElement>(null);
        const rightAddonsRef = useRef<HTMLDivElement>(null);

        const isMobile = view === 'mobile';

        const hasLeftPart = Boolean(leftAddons || hasBackButton);
        const hasRightPart = Boolean(rightAddons || hasCloser);
        const hasContent = Boolean(title || children);
        const isContentUnderImage = image?.contentPlacement === 'under';
        const withImageCollapse = Boolean(image);
        const hasCustomContent = Boolean(children) && !title && !subtitle;
        const withScrollingCustomContent =
            isMobile &&
            withImageCollapse &&
            !isContentUnderImage &&
            headerMode === 'left' &&
            hasLeftPart &&
            hasCustomContent;
        const withAnimation = Boolean(
            isMobile && hasLeftPart && headerMode === 'left' && !withImageCollapse,
        );
        const withTitleCollapse = Boolean(
            isMobile && isContentUnderImage && hasContent && headerMode === 'left',
        );
        const withContentCollapse = withAnimation || withTitleCollapse;
        const withClipCollapse = Boolean(
            isMobile &&
                hasContent &&
                headerMode === 'left' &&
                !isContentUnderImage &&
                !withScrollingCustomContent &&
                (withImageCollapse || !hasLeftPart),
        );
        const withStickyImageCollapse = withImageCollapse && !withClipCollapse;
        const isClipContentGone =
            withClipCollapse && clipExitDistance > 0 && scrollTop >= clipExitDistance;
        const showContentOnBot =
            hasContent && (isContentUnderImage || (hasLeftPart && headerMode === 'left'));
        const showContentOnTop = hasContent && !showContentOnBot;
        const showStaticContentOnTop = !withContentCollapse && showContentOnTop;
        const showStaticContentOnBot = !withContentCollapse && showContentOnBot;
        const withStickyBottomAddons = Boolean(
            isMobile &&
                withStickyImageCollapse &&
                showStaticContentOnTop &&
                hasCustomContent &&
                bottomAddons,
        );
        const bottomContentCollapseDistance = Math.max(
            0,
            bottomContentHeight - centeredContentExtra,
        );
        const titleFadeDistance = Math.max(ADDONS_HEIGHT, bottomContentCollapseDistance);
        const stickyImageDistance = withTitleCollapse
            ? Math.max(0, collapseDistance - centeredContentExtra)
            : collapseDistance;
        const titleCollapseStart = withTitleCollapse
            ? Math.max(0, stickyImageDistance - titleFadeDistance)
            : 0;
        const titleScrollTop = scrollTop - titleCollapseStart;
        const crossfadeCustomContent = withAnimation && hasCustomContent;
        const centeredFadeStart = crossfadeCustomContent ? 0 : titleFadeDistance;
        const centeredFadeDistance = crossfadeCustomContent ? titleFadeDistance : ADDONS_HEIGHT;
        const showAnimatedContentOnTop =
            withContentCollapse && showContentOnBot && titleScrollTop > centeredFadeStart;
        const showAnimatedContentOnBot = withContentCollapse && showContentOnBot;
        const withCenteredContent = showAnimatedContentOnBot || withClipCollapse;
        const centeredContentProgress = withClipCollapse
            ? scrollTop - clipExitDistance
            : titleScrollTop - centeredFadeStart;
        const showCenteredContent = withClipCollapse ? isClipContentGone : showAnimatedContentOnTop;
        const clipDistance = Math.max(0, clipHeaderExcess - centeredContentExtra);
        const headerPaddingTop = mainLinePaddingTopRef.current;
        let imageFadeDistance = collapseDistance;

        if (isContentUnderImage) {
            imageFadeDistance = navReachScrollTop;
        } else if (withClipCollapse) {
            imageFadeDistance = clipDistance;
        }

        const imageOpacity =
            withImageCollapse && imageFadeDistance > 0
                ? Math.max(0, 1 - scrollTop / imageFadeDistance)
                : 1;
        const collapsingStyle =
            withImageCollapse && !isContentUnderImage ? { opacity: imageOpacity } : undefined;
        const customContentHidden = withScrollingCustomContent && imageOpacity === 0;
        const clipContentParams: ContentParams = withClipCollapse
            ? { wrapperRef: clipContentRef, hidden: isClipContentGone }
            : {};
        const clipContentStyle = withClipCollapse
            ? { transform: `translateY(${-Math.min(scrollTop, clipExitDistance)}px)` }
            : undefined;
        const isNavigationFilled =
            isContentUnderImage &&
            (withTitleCollapse
                ? showAnimatedContentOnTop
                : navReachScrollTop > 0 && scrollTop >= navReachScrollTop);

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
            const navigation = stickyNavigationRef.current ?? mainLineRef.current;

            if (!withImageCollapse || !header || !navigation) return undefined;

            const measure = () => {
                const paddingTop = parseFloat(getComputedStyle(header).paddingTop) || 0;
                const navigationBottom = paddingTop + navigation.offsetHeight;
                const imageUnder = imageUnderRef.current;

                const headerHeight = header.offsetHeight;

                if (withScrollingCustomContent) setScrollingImageHeight(headerHeight);
                setCollapseDistance(Math.max(0, headerHeight - navigationBottom));
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
            if (withStickyBottomAddons || withScrollingCustomContent) observer.observe(navigation);

            return () => observer.disconnect();
        }, [
            withImageCollapse,
            isContentUnderImage,
            withStickyBottomAddons,
            withScrollingCustomContent,
        ]);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const header = headerRef.current;
            const mainLine = mainLineRef.current;
            const content = clipContentRef.current;

            if (!withClipCollapse || !header || !mainLine || !content) return undefined;

            const measure = () => {
                const contentOffsetTop =
                    content.offsetParent === mainLine
                        ? mainLine.offsetTop + content.offsetTop
                        : content.offsetTop;

                setClipExitDistance(contentOffsetTop + content.offsetHeight);
                setClipHeaderExcess(
                    Math.max(
                        0,
                        header.offsetHeight -
                            mainLine.offsetTop -
                            ADDONS_HEIGHT -
                            NAVIGATION_BOTTOM_GAP,
                    ),
                );
            };

            measure();

            if (typeof ResizeObserver === 'undefined') return undefined;

            const observer = new ResizeObserver(measure);

            observer.observe(header);
            observer.observe(content);

            return () => observer.disconnect();
        }, [withClipCollapse, showContentOnBot]);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const content = bottomContentRef.current;

            if (!withContentCollapse || !content) return undefined;

            const measure = () => setBottomContentHeight(content.offsetHeight);

            measure();

            if (typeof ResizeObserver === 'undefined') return undefined;

            const observer = new ResizeObserver(measure);

            observer.observe(content);

            return () => observer.disconnect();
        }, [withContentCollapse, showAnimatedContentOnBot]);

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
            const titleCollapseEnd = withTitleCollapse
                ? titleCollapseStart + titleFadeDistance + ADDONS_HEIGHT
                : 0;
            let maxScrollTop = titleFadeDistance + ADDONS_HEIGHT;

            if (withClipCollapse) {
                maxScrollTop = Math.max(clipExitDistance + ADDONS_HEIGHT, clipDistance);
            } else if (withImageCollapse) {
                maxScrollTop = Math.max(collapseDistance, titleCollapseEnd);
            }

            const handleScroll = (ev: Event) => {
                const divElement = ev.target as HTMLDivElement;

                setScrollTop(Math.min(Math.max(divElement.scrollTop, 0), maxScrollTop));
            };

            if (withAnimation && headerRef.current) {
                mainLinePaddingTopRef.current = getComputedStyle(headerRef.current).paddingTop;
            }

            if ((withAnimation || withImageCollapse || withClipCollapse) && parent) {
                if (withTitleCollapse || withStickyBottomAddons || withScrollingCustomContent) {
                    setScrollTop(Math.min(Math.max(parent.scrollTop, 0), maxScrollTop));
                }
                parent.addEventListener('scroll', handleScroll);
            }

            return () => parent?.removeEventListener('scroll', handleScroll);
        }, [
            scrollableParentRef,
            withAnimation,
            withImageCollapse,
            withTitleCollapse,
            withStickyBottomAddons,
            withScrollingCustomContent,
            withClipCollapse,
            collapseDistance,
            titleCollapseStart,
            clipExitDistance,
            clipDistance,
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

        const bottomAddonsElement = bottomAddons && (
            <div
                className={cn(styles.bottomAddons, bottomAddonsClassName)}
                style={
                    withStickyBottomAddons
                        ? undefined
                        : {
                              ...collapsingStyle,
                              visibility: customContentHidden ? 'hidden' : undefined,
                          }
                }
            >
                {bottomAddons}
            </div>
        );

        const navigation = (
            <div
                ref={mainLineRef}
                className={cn(styles.mainLine, {
                    [styles.mainLineClipCollapse]: withClipCollapse,
                    [styles.mainLineSticky]:
                        withAnimation || (withStickyImageCollapse && !withStickyBottomAddons),
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
                        ...clipContentParams,
                        style: {
                            ...(withClipCollapse && collapsingStyle),
                            ...clipContentStyle,
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
                                Math.max(0, centeredContentProgress) / centeredFadeDistance,
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
                            <div className={cn(styles.addon, addonClassName)}>{rightAddons}</div>
                        )}

                        {hasCloser && renderCloser()}
                    </div>
                )}
            </div>
        );

        const header = (
            <div
                ref={mergeRefs([ref, headerRef])}
                className={cn(styles.header, className, {
                    [styles.withClipCollapse]: withClipCollapse,
                    [styles.withImage]: image,
                    [styles.withContentUnderImage]: isContentUnderImage,
                    [styles.withTitleUnderImage]: withTitleCollapse,
                })}
                data-test-id={getDataTestId(dataTestId)}
                style={{
                    ...(!isContentUnderImage && getImageSizeStyle(image)),
                    ...(withStickyImageCollapse && { top: -stickyImageDistance }),
                    ...(withScrollingCustomContent && { backgroundColor: 'transparent' }),
                    ...(customContentHidden && { pointerEvents: 'none' }),
                    ...(withClipCollapse &&
                        clipDistance > 0 && {
                            clipPath: `inset(0 0 ${Math.min(scrollTop, clipDistance)}px 0)`,
                        }),
                    ...(withAnimation && { top: -bottomContentCollapseDistance }),
                }}
                data-name={dataName}
            >
                {image && !isContentUnderImage && !withScrollingCustomContent && (
                    <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${image.src})`, opacity: imageOpacity }}
                        aria-hidden={true}
                    />
                )}
                {withStickyBottomAddons ? (
                    <div ref={stickyNavigationRef} className={styles.stickyNavigation}>
                        {navigation}
                        {bottomAddonsElement}
                    </div>
                ) : (
                    navigation
                )}

                {image && isContentUnderImage && (
                    <div
                        ref={imageUnderRef}
                        className={styles.imageUnder}
                        style={{
                            ...getImageSizeStyle(image),
                            backgroundImage: `url(${image.src})`,
                            opacity: withTitleCollapse ? undefined : imageOpacity,
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
                        ...clipContentParams,
                        hidden: customContentHidden || clipContentParams.hidden,
                        extraClassName: cn({
                            [styles.contentOnBotDesktop]: view === 'desktop',
                        }),
                        style: { ...collapsingStyle, ...clipContentStyle },
                        extraAlign: isContentUnderImage ? undefined : 'left',
                    })}

                {!withStickyBottomAddons && bottomAddonsElement}
            </div>
        );

        return (
            <React.Fragment>
                {withScrollingCustomContent && image && (
                    <div
                        className={styles.scrollingImageViewport}
                        style={{
                            height: scrollingImageHeight,
                            marginBottom: -scrollingImageHeight,
                        }}
                        aria-hidden={true}
                    >
                        <div className={styles.scrollingImageAnchor}>
                            <div
                                className={styles.image}
                                style={{
                                    height: scrollingImageHeight,
                                    backgroundImage: `url(${image.src})`,
                                }}
                            />
                        </div>
                    </div>
                )}
                {header}
            </React.Fragment>
        );
    },
);

NavigationBarPrivateNext.displayName = 'NavigationBarPrivateNext';
