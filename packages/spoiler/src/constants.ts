/** Внутренние параметры облака; они не являются настройками публичного API. */
export const PARTICLES = {
    limit: 5000,
    density: 0.58,
    cellInset: 0.16,
    radius: { min: 0.55, range: 1.35 },
    speed: { min: 0.9, range: 1 },
    wobbleX: { min: 0.8, range: 2.4 },
    wobbleY: { min: 0.5, range: 1.8 },
    verticalSpeedRatio: 0.83,
    opacity: { min: 0.65, range: 0.35, multiplierMin: 0.2, multiplierMax: 0.8 },
    twinkleDuration: { min: 2, range: 3 },
    twinkleRadiusMin: 0.5,
    textEdgeSpread: 4,
} as const;

export const DISSOLVE = {
    stagger: 0.12,
    finalRadiusScale: 0.25,
    scatter: { min: 4, range: 4 },
} as const;
export const CANVAS = { pixels: 4000000, side: 8192, supersampling: 2, maxScale: 4 } as const;
export const FONT = { base: 16, minScale: 0.6, maxScale: 2.5, maxParticleScale: 1.25 } as const;
export const FULL_CIRCLE = Math.PI * 2;
export const COLOR_SYNC_INTERVAL = 1;
export const DEFAULT_TRANSITION_MS = 280;
export const MILLISECONDS_PER_SECOND = 1000;

/** Высота полосы ≈ 70% кегля с шагом 2px, как в текстовых стилях макета. */
export const getCloudHeight = (fontSize: number) => Math.max(1, Math.round(fontSize * 0.35) * 2);
