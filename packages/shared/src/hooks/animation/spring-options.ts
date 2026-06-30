import { type useModalSpringTransition } from './use-modal-animation';
import { type useSpringTransition } from './use-universal-modal-animation';

export type SpringOptions = {
    stiffness?: number;
    damping?: number;
    mass?: number;
};

export type AnimationValues = Record<string, [number | string, number | string]>;
export type SpringHookType = typeof useSpringTransition | typeof useModalSpringTransition;
