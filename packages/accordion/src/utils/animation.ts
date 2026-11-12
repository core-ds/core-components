import { collapseSpring, expandSpring } from '@alfalab/core-components-spring-animation';

const bodyCollapseDelay = 40;

const contentExpandDelay = 60;

export const bodyAnimation = {
    enter: expandSpring,
    exit: { ...collapseSpring, delay: bodyCollapseDelay },
};

export const contentExpanded = { y: 0, opacity: 1, filter: 'none' };

export const contentCollapsed = { y: -12, opacity: 0, filter: 'blur(2px)' };

const createContentAnimation = (expandDelay: number) =>
    ({
        enter: {
            y: { ...bodyAnimation.enter, delay: expandDelay },
            opacity: { type: 'tween', duration: 300, ease: [0.4, 0, 0.2, 1], delay: expandDelay },
            filter: {
                type: 'tween',
                duration: 250,
                ease: [0.215, 0.61, 0.355, 1],
                delay: expandDelay,
            },
        },
        exit: {
            y: bodyAnimation.exit,
            opacity: { type: 'tween', duration: 150, ease: [0.4, 0, 1, 1] },
            filter: { type: 'tween', duration: 150, ease: [0.4, 0, 1, 1] },
        },
    }) as const;

const contentAnimation = createContentAnimation(contentExpandDelay);

const contentAnimationOnCollapse = createContentAnimation(0);

export const getContentAnimation = (isCollapsing: boolean) =>
    isCollapsing ? contentAnimationOnCollapse : contentAnimation;
