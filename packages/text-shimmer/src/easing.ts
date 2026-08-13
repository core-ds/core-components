const easeOutCubicPoints = [0.215, 0.61, 0.355, 1] as const;
const easeInOutCubicPoints = [0.645, 0.045, 0.355, 1] as const;

export const easingCss = {
    easeOutCubic: `cubic-bezier(${easeOutCubicPoints.join(', ')})`,
    easeInOutCubic: `cubic-bezier(${easeInOutCubicPoints.join(', ')})`,
} as const;
