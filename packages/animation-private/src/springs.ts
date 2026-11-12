import { type AnimationTransition } from './animate';

export const springs: Record<'expand' | 'collapse' | 'rotate', AnimationTransition> = {
    expand: { stiffness: 426, damping: 41, mass: 1 },
    collapse: { stiffness: 743, damping: 49, mass: 1 },
    rotate: { stiffness: 798, damping: 39, mass: 1 },
};
