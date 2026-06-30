type IndicatorTagSize = 32 | 40 | 48;
type IndicatorTagMode = 'none' | 'dot' | 'count';
type IndicatorWithBadgeMode = Exclude<IndicatorTagMode, 'none'>;

type SizePaths = Record<IndicatorTagSize, string>;
type ModePaths = Record<IndicatorTagMode, SizePaths>;
type IndicatorGeometryModePaths = Record<
    IndicatorWithBadgeMode,
    Record<IndicatorTagSize, IndicatorGeometry>
>;
type ShapeGeometry = Record<'rounded' | 'rectangular', IndicatorGeometryModePaths>;

type IndicatorGeometry = {
    width: number;
    height: number;
    indicatorX: number;
    indicatorY: number;
};

const DOUBLE_INDICATOR_SHIFT_X = 3;
const TRIPLE_INDICATOR_SHIFT_X = 6;

const ROUNDED_CIRCLE_48 =
    'M24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0Z';

const RECTANGULAR_NONE_48 =
    'M10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10C0 4.47715 4.47715 0 10 0Z';

export const indicatorTagPaths = {
    rounded: {
        none: {
            32: 'M40 16C40 24.8366 32.8366 32 24 32H16C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0H24C32.8366 0 40 7.16344 40 16Z',
            40: 'M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z',
            48: ROUNDED_CIRCLE_48,
        },
        dot: {
            32: 'M26 0a4 4 0 0 1 4 4 6 6 0 0 0 6 6 4 4 0 0 1 4 4v2c0 8.837-7.163 16-16 16h-8C7.163 32 0 24.837 0 16S7.163 0 16 0z',
            40: 'M20 0c3.249 0 6.316.775 9.028 2.15.67.34.972 1.1.972 1.85a6 6 0 0 0 6 6c.75 0 1.51.301 1.849.97A19.9 19.9 0 0 1 40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0',
            48: ROUNDED_CIRCLE_48,
        },
        count: {
            32: 'M26 0a2 2 0 0 1 2 2c0 5.523 4.477 10 10 10a2 2 0 0 1 2 2v2c0 8.837-7.163 16-16 16h-8C7.163 32 0 24.837 0 16S7.163 0 16 0z',
            40: 'M20 0c2.171 0 4.261.347 6.218.987.092.03.187.053.28.077a2 2 0 0 1 .468.184l.03.011a.01.01 0 0 1 .004.007l.003.006c.589.342.988.974.997 1.702 0 .014.012.026.026.026q.023.002.026.024a10 10 0 0 0 8.924 8.923.03.03 0 0 1 .024.026c0 .015.012.027.027.027.727.01 1.36.409 1.702.997l.005.003q.005 0 .006.004l.009.025.003.006q.12.22.184.468c.024.095.047.191.077.284A20 20 0 0 1 40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0',
            48: 'M24 0C24.2897 0 24.5781 0.006345 24.8652 0.0166016H27.2598C30.2567 0.0168292 32.7394 2.21626 33.1836 5.08887C34.051 10.0297 37.9393 13.9264 42.875 14.8086C45.773 15.2253 48 17.7181 48 20.7314V24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0Z',
        },
    } satisfies ModePaths,
    rectangular: {
        none: {
            32: 'M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V24C40 28.4183 36.4183 32 32 32H8C3.58172 32 0 28.4183 0 24V8Z',
            40: 'M0 11C0 4.92487 4.92487 0 11 0H29C35.0751 0 40 4.92487 40 11V29C40 35.0751 35.0751 40 29 40H11C4.92487 40 0 35.0751 0 29V11Z',
            48: RECTANGULAR_NONE_48,
        },
        dot: {
            32: 'M26 0a4 4 0 0 1 4 4 6 6 0 0 0 6 6 4 4 0 0 1 4 4v10a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z',
            40: 'M26 0a4 4 0 0 1 4 4 6 6 0 0 0 6 6 4 4 0 0 1 4 4v16c0 5.523-4.477 10-10 10H10C4.477 40 0 35.523 0 30V10C0 4.477 4.477 0 10 0z',
            48: 'M36 0C37.6396 0 38.9704 1.31528 38.998 2.94824H39.001C39.0008 2.9658 39 2.98338 39 3.00098C39 6.30719 41.6742 8.98789 44.9775 9H45.0166C45.0277 8.99945 45.0387 8.99911 45.0498 8.99902L45.0488 9C46.6667 9.02582 47.972 10.3323 47.998 11.9502H48V37.999C48 43.5219 43.5228 47.999 38 47.999H10C4.47715 47.999 0 43.5219 0 37.999V10.0029C0 4.48008 4.47715 0.00292969 10 0.00292969H35.8848C35.923 0.00148503 35.9614 0 36 0Z',
        },
        count: {
            32: 'M26 0a2 2 0 0 1 2 2c0 5.523 4.477 10 10 10a2 2 0 0 1 2 2v10a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z',
            40: 'M26 0a2 2 0 0 1 2 2c0 5.523 4.477 10 10 10a2 2 0 0 1 2 2v16c0 5.523-4.477 10-10 10H10C4.477 40 0 35.523 0 30V10C0 4.477 4.477 0 10 0z',
            48: 'M30 0C31.6569 0 33 1.34315 33 3C33 9.62742 38.3726 15 45 15C46.6569 15 48 16.3431 48 18V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10C0 4.47715 4.47715 0 10 0H30Z',
        },
    } satisfies ModePaths,
} as const;

export const indicatorTagGeometry = {
    rounded: {
        dot: {
            32: { width: 40, height: 32, indicatorX: 36, indicatorY: 4 },
            40: { width: 40, height: 40, indicatorX: 36, indicatorY: 4 },
            48: { width: 48, height: 48, indicatorX: 45, indicatorY: 3 },
        },
        count: {
            32: { width: 40, height: 32, indicatorX: 38, indicatorY: 2 },
            40: { width: 40, height: 40, indicatorX: 38, indicatorY: 2 },
            48: { width: 48, height: 48, indicatorX: 43.5, indicatorY: 4 },
        },
    },
    rectangular: {
        dot: {
            32: { width: 40, height: 32, indicatorX: 36, indicatorY: 4 },
            40: { width: 40, height: 40, indicatorX: 36, indicatorY: 4 },
            48: { width: 48, height: 48, indicatorX: 45, indicatorY: 3 },
        },
        count: {
            32: { width: 40, height: 32, indicatorX: 38, indicatorY: 2 },
            40: { width: 40, height: 40, indicatorX: 38, indicatorY: 2 },
            48: { width: 48, height: 48, indicatorX: 43.5, indicatorY: 4 },
        },
    },
} satisfies ShapeGeometry;

/** Сдвиг индикатора по X от числа цифр */
export const resolveValueToIndicatorShiftX = (value: number | undefined): number => {
    if (value == null || value < 10) return 0;

    return value >= 100 ? TRIPLE_INDICATOR_SHIFT_X : DOUBLE_INDICATOR_SHIFT_X;
};
