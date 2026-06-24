import React, { useLayoutEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { type CSSTransitionProps } from 'react-transition-group/CSSTransition';

import {
    type AnimationValues,
    type SpringOptions,
    useSpringTransition,
} from '@alfalab/core-components-shared';

type CSSAnimationProps = {
    children: React.ReactNode;
    useSpring?: false;
    cssTransitionProps: CSSTransitionProps;
};

type SpringAnimationInnerProps = {
    open: boolean;
    exited: boolean | null;
    nodeRef: React.RefObject<HTMLDivElement>;
    springOptions: SpringOptions;
    enter: AnimationValues;
    exit: AnimationValues;
    onEntered: () => void;
    onExited: () => void;
    onSpringStart?: () => void;
    onSpringEnd?: () => void;
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
    springOptions,
    onEntered,
    onExited,
    onSpringStart,
    onSpringEnd,
    enter,
    exit,
}: SpringAnimationInnerProps & { children: React.ReactNode }) => {
    const fallbackRef = useRef<HTMLDivElement>(null);

    const { playEnter, playExit } = useSpringTransition(
        nodeRef ?? fallbackRef,
        springOptions,
        enter,
        exit,
        {
            onEntered,
            onExited,
        },
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
