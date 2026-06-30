export type SpringOptions = {
    stiffness?: number;
    damping?: number;
    mass?: number;
};

export type AnimationValues = Record<string, [number | string, number | string]>;
