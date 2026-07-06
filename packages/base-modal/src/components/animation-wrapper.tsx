import React, { type MutableRefObject, type RefObject, useLayoutEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { type CSSTransitionProps } from 'react-transition-group/CSSTransition';

type CSSAnimationProps = {
    children: React.ReactNode;
    useSpring?: false;
    cssTransitionProps: CSSTransitionProps;
};

export type SpringOptions = {
    stiffness?: number;
    damping?: number;
    mass?: number;
};

type SpringHook = (
    ref: RefObject<HTMLElement | null>,
    callbacks?: {
        onEntered?: () => void;
        onExited?: () => void;
    },
    contentRef?: RefObject<HTMLElement | null>,
) => {
    playEnter: () => void;
    playExit: () => void;
};

export type SpringHookType = SpringHook;

type SpringAnimationInnerProps = {
    open: boolean;
    exited: boolean | null;
    nodeRef: React.RefObject<HTMLDivElement>;
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
    hook: useSpringHook,
    contentRef,
}: SpringAnimationInnerProps & { children: React.ReactNode }) => {
    const fallbackRef = useRef<HTMLDivElement>(null);

    const { playEnter, playExit } = useSpringHook(
        nodeRef ?? fallbackRef,
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
