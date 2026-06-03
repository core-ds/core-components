type IndicatorTagSize = 32 | 40;
type IndicatorTagMode = 'none' | 'dot' | 'count';
type IndicatorWithBadgeMode = Exclude<IndicatorTagMode, 'none'>;

type SizePaths = Record<IndicatorTagSize, string>;
type ModePaths = Record<IndicatorTagMode, SizePaths>;

type IndicatorGeometry = {
    width: number;
    height: number;
    indicatorX: number;
    indicatorY: number;
};

const DOUBLE_INDICATOR_SHIFT_X = 3;
const TRIPLE_INDICATOR_SHIFT_X = 6;

export const indicatorTagPaths = {
    rounded: {
        none: {
            32: 'M40 16C40 24.8366 32.8366 32 24 32H16C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0H24C32.8366 0 40 7.16344 40 16Z',
            40: 'M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z',
        },
        dot: {
            32: 'M26 0a4 4 0 0 1 4 4 6 6 0 0 0 6 6 4 4 0 0 1 4 4v2c0 8.837-7.163 16-16 16h-8C7.163 32 0 24.837 0 16S7.163 0 16 0z',
            40: 'M20 0c3.249 0 6.316.775 9.028 2.15.67.34.972 1.1.972 1.85a6 6 0 0 0 6 6c.75 0 1.51.301 1.849.97A19.9 19.9 0 0 1 40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0',
        },
        count: {
            32: 'M26 0a2 2 0 0 1 2 2c0 5.523 4.477 10 10 10a2 2 0 0 1 2 2v2c0 8.837-7.163 16-16 16h-8C7.163 32 0 24.837 0 16S7.163 0 16 0z',
            40: 'M20 0c2.171 0 4.261.347 6.218.987.092.03.187.053.28.077a2 2 0 0 1 .468.184l.03.011a.01.01 0 0 1 .004.007l.003.006c.589.342.988.974.997 1.702 0 .014.012.026.026.026q.023.002.026.024a10 10 0 0 0 8.924 8.923.03.03 0 0 1 .024.026c0 .015.012.027.027.027.727.01 1.36.409 1.702.997l.005.003q.005 0 .006.004l.009.025.003.006q.12.22.184.468c.024.095.047.191.077.284A20 20 0 0 1 40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0',
        },
    } satisfies ModePaths,
    rectangular: {
        none: {
            32: 'M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V24C40 28.4183 36.4183 32 32 32H8C3.58172 32 0 28.4183 0 24V8Z',
            40: 'M0 11C0 4.92487 4.92487 0 11 0H29C35.0751 0 40 4.92487 40 11V29C40 35.0751 35.0751 40 29 40H11C4.92487 40 0 35.0751 0 29V11Z',
        },
        dot: {
            32: 'M26 0a4 4 0 0 1 4 4 6 6 0 0 0 6 6 4 4 0 0 1 4 4v10a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z',
            40: 'M26 0a4 4 0 0 1 4 4 6 6 0 0 0 6 6 4 4 0 0 1 4 4v16c0 5.523-4.477 10-10 10H10C4.477 40 0 35.523 0 30V10C0 4.477 4.477 0 10 0z',
        },
        count: {
            32: 'M26 0a2 2 0 0 1 2 2c0 5.523 4.477 10 10 10a2 2 0 0 1 2 2v10a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z',
            40: 'M26 0a2 2 0 0 1 2 2c0 5.523 4.477 10 10 10a2 2 0 0 1 2 2v16c0 5.523-4.477 10-10 10H10C4.477 40 0 35.523 0 30V10C0 4.477 4.477 0 10 0z',
        },
    } satisfies ModePaths,
} as const;

export const indicatorTagGeometry: Record<
    IndicatorWithBadgeMode,
    Record<IndicatorTagSize, IndicatorGeometry>
> = {
    dot: {
        32: { width: 40, height: 32, indicatorX: 36, indicatorY: 4 },
        40: { width: 40, height: 40, indicatorX: 36, indicatorY: 4 },
    },
    count: {
        32: { width: 40, height: 32, indicatorX: 38, indicatorY: 2 },
        40: { width: 40, height: 40, indicatorX: 38, indicatorY: 2 },
    },
};

/** Сдвиг индикатора по X от числа цифр */
export const resolveValueToIndicatorShiftX = (value: number | undefined): number => {
    if (value == null || value < 10) return 0;

    return value >= 100 ? TRIPLE_INDICATOR_SHIFT_X : DOUBLE_INDICATOR_SHIFT_X;
};
