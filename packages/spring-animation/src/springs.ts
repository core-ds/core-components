import { type AnimationTransition } from './animate';

export const expandSpring: AnimationTransition = { stiffness: 426, damping: 41, mass: 1 };

export const collapseSpring: AnimationTransition = { stiffness: 743, damping: 49, mass: 1 };

export const rotateSpring: AnimationTransition = { stiffness: 798, damping: 39, mass: 1 };
