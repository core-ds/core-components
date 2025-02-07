import React, {
    FC,
    Fragment,
    HTMLAttributes,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Popover } from '@alfalab/core-components-popover';

import type { TooltipDesktopProps } from '../types';

import defaultColors from '../default.module.css';
import styles from '../index.module.css';
import invertedColors from '../inverted.module.css';
import desktopStyles from './desktop.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

const DEFAULT_OFFSET: [number, number] = [0, 16];

export const TooltipDesktop: FC<TooltipDesktopProps> = ({
    children,
    content,
    trigger = 'hover',
    onCloseDelay = 300,
    onOpenDelay = 300,
    dataTestId,
    open: forcedOpen,
    offset = DEFAULT_OFFSET,
    position,
    contentClassName,
    arrowClassName,
    popoverClassName,
    updatePopover,
    targetClassName,
    targetTag: TargetTag = 'div',
    zIndex,
    onClose,
    onOpen,
    getPortalContainer,
    view = 'tooltip',
    targetRef = null,
    fallbackPlacements,
    preventOverflow = true,
    availableHeight = false,
    anchor = null,
    colors = 'default',
    useAnchorWidth,
    onTargetClick,
    withTransition = true,
}) => {
    const [visible, setVisible] = useState(!!forcedOpen);
    const [target, setTarget] = useState<HTMLElement | null>(null);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const timer = useRef(0);

    const show = forcedOpen === undefined ? visible : forcedOpen;

    const open = () => {
        if (!show) {
            setVisible(true);

            if (onOpen) {
                onOpen();
            }
        }
    };

    const close = useCallback(() => {
        if (show) {
            setVisible(false);

            if (onClose) {
                onClose();
            }
        }
    }, [onClose, show]);

    const toggle = () => {
        if (show) {
            close();
        } else {
            open();
        }
    };

    const clickedOutside = useCallback(
        (node: Element): boolean => {
            if (target && target.contains(node)) {
                return false;
            }

            if (contentRef.current && contentRef.current.contains(node)) {
                return false;
            }

            return true;
        },
        [target],
    );

    useEffect(() => {
        const handleBodyClick = (event: MouseEvent | TouchEvent) => {
            const eventTarget = event.target as Element;

            if (clickedOutside(eventTarget)) {
                close();
            }
        };

        document.body.addEventListener('click', handleBodyClick);
        document.body.addEventListener('touchstart', handleBodyClick);

        return () => {
            document.body.removeEventListener('click', handleBodyClick);
            document.body.removeEventListener('touchstart', handleBodyClick);

            clearTimeout(timer.current);
        };
    }, [clickedOutside, close]);

    const handleTargetClick = (event: React.MouseEvent<HTMLElement>) => {
        event.persist();
        onTargetClick?.(event);
        toggle();
    };

    const handleMouseOver = () => {
        clearTimeout(timer.current);

        timer.current = window.setTimeout(() => {
            open();
        }, onOpenDelay);
    };

    const handleMouseOut = () => {
        clearTimeout(timer.current);

        timer.current = window.setTimeout(() => {
            close();
        }, onCloseDelay);
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
        const eventTarget = event.target as Element;

        clearTimeout(timer.current);

        if (clickedOutside(eventTarget)) {
            timer.current = window.setTimeout(() => {
                close();
            }, onCloseDelay);
        } else {
            open();
        }
    };

    const onClickProps = { onClick: handleTargetClick };

    const onHoverProps = {
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
        onTouchStart: handleTouchStart,
    };

    const getTargetProps = (): HTMLAttributes<HTMLElement> => {
        const props = {
            className: cn(styles.target, targetClassName, {
                [styles.inline]: TargetTag === 'span',
            }),
        };

        switch (trigger) {
            case 'click':
                return {
                    ...props,
                    ...onClickProps,
                };
            case 'hover':
                return {
                    ...props,
                    ...onHoverProps,
                };
            default:
                return {};
        }
    };

    const getContentProps = (): HTMLAttributes<HTMLElement> => {
        const props = {
            ref: contentRef,
            'data-test-id': dataTestId,
            className: cn(styles.component, contentClassName),
        };

        switch (trigger) {
            case 'hover':
                return {
                    ...props,
                    ...onHoverProps,
                };
            default:
                return props;
        }
    };

    return (
        <Fragment>
            <TargetTag ref={mergeRefs([targetRef, setTarget])} {...getTargetProps()}>
                {children.props.disabled && <div className={styles.overlap} />}
                {children}
            </TargetTag>

            <Popover
                anchorElement={anchor || target}
                open={show}
                getPortalContainer={getPortalContainer}
                arrowClassName={cn(arrowClassName, styles.arrow, colorStyles[colors].arrow)}
                popperClassName={cn(styles.popper, styles[view], colorStyles[colors][view], {
                    [desktopStyles.popper]: view === 'tooltip',
                    [desktopStyles.hint]: view === 'hint',
                })}
                className={popoverClassName}
                offset={offset}
                withArrow={true}
                position={position}
                update={updatePopover}
                zIndex={zIndex}
                fallbackPlacements={fallbackPlacements}
                preventOverflow={preventOverflow}
                availableHeight={availableHeight}
                useAnchorWidth={useAnchorWidth}
                withTransition={withTransition}
            >
                <div {...getContentProps()}>{content}</div>
            </Popover>
        </Fragment>
    );
};
