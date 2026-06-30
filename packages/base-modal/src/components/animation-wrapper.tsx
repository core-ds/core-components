import React, { type MutableRefObject, useLayoutEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { type CSSTransitionProps } from 'react-transition-group/CSSTransition';

import { type AnimationParams, type SpringHookType } from '@alfalab/core-components-shared';

type CSSAnimationProps = {
    children: React.ReactNode;
    useSpring?: false;
    cssTransitionProps: CSSTransitionProps;
};

type SpringAnimationInnerProps = {
    open: boolean;
    exited: boolean | null;
    nodeRef: React.RefObject<HTMLDivElement>;
    enter: AnimationParams;
    exit: AnimationParams;
    onEntered: () => void;
    onExited: () => void;
    onSpringStart?: () => void;
    onSpringEnd?: () => void;
    hook: SpringHookType;
    contentRef?: MutableRefObject<HTMLDivElement | null>;
};

type SpringAnimationProps = {
    children: React.ReactNode;
    useSpring: true;
    springProps: SpringAnimationInnerProps;
};

export type AnimationWrapperConfig =
    | Omit<CSSAnimationProps, 'children'>
    | Omit<SpringAnimationProps, 'children'>;

const SpringAnimationInner = ({
    children,
    open,
    exited,
    nodeRef,
    onEntered,
    onExited,
    onSpringStart,
    onSpringEnd,
    enter,
    exit,
    hook: useSpringHook,
    contentRef,
}: SpringAnimationInnerProps & { children: React.ReactNode }) => {
    const fallbackRef = useRef<HTMLDivElement>(null);

    const { playEnter, playExit } = useSpringHook(
        nodeRef ?? fallbackRef,
        enter,
        exit,
        {
            onEntered,
            onExited,
        },
        contentRef,
    );

    useLayoutEffect(() => {
        if (exited !== false) return;
        if (open) {
            playEnter();
            onSpringStart?.();
        } else {
            playExit();
            onSpringEnd?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, exited]);

    return children;
};

export const AnimationWrapper = ({
    config,
    children,
}: {
    config: AnimationWrapperConfig;
    children: React.ReactNode;
}) => {
    if (config.useSpring) {
        return <SpringAnimationInner {...config.springProps}>{children}</SpringAnimationInner>;
    }

    const { cssTransitionProps } = config;

    return <CSSTransition {...cssTransitionProps}>{children}</CSSTransition>;
};
