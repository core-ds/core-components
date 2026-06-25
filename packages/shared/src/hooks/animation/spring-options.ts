export type SpringOptions = {
    stiffness?: number;
    damping?: number;
    mass?: number;
};

export const ACCORDION_EXPAND_SPRING: Required<SpringOptions> = {
    stiffness: 315,
    damping: 30,
    mass: 0.74,
};

export const ACCORDION_COLLAPSE_SPRING: Required<SpringOptions> = {
    stiffness: 520,
    damping: 34,
    mass: 0.7,
};
