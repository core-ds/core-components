function easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;
}

export const easingFns = {
    easeInOutQuad,
};
