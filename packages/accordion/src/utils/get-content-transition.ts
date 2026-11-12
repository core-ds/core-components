import { springs } from '@alfalab/core-components-animation-private';

const contentDelay = 60;

export const bodyTransition = {
    enter: springs.expand,
    exit: { ...springs.collapse, delay: 40 },
};

const createContentTransition = (delay: number) =>
    ({
        enter: {
            y: { ...bodyTransition.enter, delay },
            opacity: { type: 'tween', duration: 300, ease: [0.4, 0, 0.2, 1], delay },
            filter: { type: 'tween', duration: 250, ease: [0.215, 0.61, 0.355, 1], delay },
        },
        exit: {
            y: bodyTransition.exit,
            opacity: { type: 'tween', duration: 150, ease: [0.4, 0, 1, 1] },
            filter: { type: 'tween', duration: 150, ease: [0.4, 0, 1, 1] },
        },
    }) as const;

export const contentEnter = { y: 0, opacity: 1, filter: 'none' };

export const contentExit = { y: -12, opacity: 0, filter: 'blur(2px)' };

const contentTransition = createContentTransition(contentDelay);

const bodyExitingContentTransition = createContentTransition(0);

export const getContentTransition = (isBodyExiting: boolean) =>
    isBodyExiting ? bodyExitingContentTransition : contentTransition;
