import { type BaseTagProps } from './typings';

type JunctionPoint = { cx: number; cy: number };

export const DOT_RADIUS = 5;
export const BADGE_NUMBER_RADIUS = 8;

const OFFSET = 3;
const SIN_45 = Math.SQRT2 / 2;

/** Радиус круга в точках пересечения эллипса и окружности */
export const JR = 2;
/** Сторона чёрного квадрата-резца в точках пересечения эллипса и окружности */
export const JR_RECT = 4;

const EPSILON = 1e-3;
const DOUBLE_INDICATOR_SHIFT_X = 3;
const TRIPLE_INDICATOR_SHIFT_X = 6;

type BadgeIconSize = NonNullable<BaseTagProps['size']>;

type BadgeIconDimensions = {
    width: number;
    height: number;
};

/** Преобразует пресет-size в значения width/height */
export const resolveSizeToDimensions = (size: BadgeIconSize): BadgeIconDimensions => {
    switch (size) {
        case 32:
            return { width: 40, height: 32 };
        default:
            return { width: size, height: size };
    }
};

/** Сдвиг индикатора по X от числа цифр */
export const resolveValueToIndicatorShiftX = (value: number | undefined): number => {
    if (value == null || value < 10) return 0;

    return value >= 100 ? TRIPLE_INDICATOR_SHIFT_X : DOUBLE_INDICATOR_SHIFT_X;
};

type IntersectEllipseCircleParams = {
    ecx: number;
    ecy: number;
    erx: number;
    ery: number;
    ccx: number;
    ccy: number;
    cr: number;
};

/** Находит две точки пересечения эллипса и окружности */
const intersectEllipseCircle = ({
    ecx,
    ecy,
    erx,
    ery,
    ccx,
    ccy,
    cr,
}: IntersectEllipseCircleParams): [JunctionPoint, JunctionPoint] | null => {
    const targetSq = cr * cr;
    const STEPS = 360;
    const hits: JunctionPoint[] = [];

    const isSamePoint = (a: JunctionPoint, b: JunctionPoint): boolean =>
        Math.hypot(a.cx - b.cx, a.cy - b.cy) < EPSILON;

    for (let i = 0; i < STEPS; i++) {
        const t0 = (i / STEPS) * 2 * Math.PI;
        const t1 = ((i + 1) / STEPS) * 2 * Math.PI;

        const distSq = (t: number): number => {
            const x = ecx + erx * Math.cos(t);
            const y = ecy + ery * Math.sin(t);

            return (x - ccx) ** 2 + (y - ccy) ** 2 - targetSq;
        };

        const d0 = distSq(t0);
        const d1 = distSq(t1);

        if (d0 * d1 <= 0) {
            const frac = Math.abs(d0) / (Math.abs(d0) + Math.abs(d1) + 1e-12);
            const t = t0 + frac * (t1 - t0);
            const nextHit: JunctionPoint = {
                cx: ecx + erx * Math.cos(t),
                cy: ecy + ery * Math.sin(t),
            };

            if (!hits.some((hit) => isSamePoint(hit, nextHit))) {
                hits.push(nextHit);
            }
        }
    }

    if (hits.length < 2) {
        return null;
    }

    const rightPoint = hits.reduce((currentRight, hit) =>
        hit.cx > currentRight.cx ? hit : currentRight,
    );
    const topPoint = hits.reduce((currentTop, hit) => (hit.cy < currentTop.cy ? hit : currentTop));

    if (!isSamePoint(rightPoint, topPoint)) {
        return [rightPoint, topPoint];
    }

    const fallbackPoint = hits.find((hit) => !isSamePoint(hit, rightPoint));

    return fallbackPoint ? [rightPoint, fallbackPoint] : null;
};

type ComputeGeometryParams = {
    width: number;
    height: number;
    shape: BaseTagProps['shape'];
    indicatorProps?: BaseTagProps['indicatorProps'];
};

const resolveBadgeRadiusFromIndicatorProps = (
    indicatorProps: BaseTagProps['indicatorProps'] | undefined,
): number => {
    if (indicatorProps === undefined) {
        return 0;
    }

    const mode =
        indicatorProps.mode ?? (typeof indicatorProps.value === 'number' ? 'count' : 'dot');

    if (mode === 'dot') {
        return DOT_RADIUS;
    }

    return typeof indicatorProps.value === 'number' ? BADGE_NUMBER_RADIUS : DOT_RADIUS;
};

type BadgeGeometry = {
    badgeX: number;
    badgeY: number;
    cutoutR: number;
    cr?: number;
    junctions: [JunctionPoint, JunctionPoint] | null;
};

/** Расчет геометрии маски бейдж-иконки: положение бейджа, радиус выреза и точки стыка (junction) */
export const resolveGeometry = ({
    width: w,
    height: h,
    shape,
    indicatorProps,
}: ComputeGeometryParams): BadgeGeometry => {
    const badgeRadius = resolveBadgeRadiusFromIndicatorProps(indicatorProps);

    if (badgeRadius === 0) {
        return {
            badgeX: 0,
            badgeY: 0,
            cutoutR: 0,
            cr: shape === 'rectangular' ? Math.round(Math.min(w, h) * 0.22) : undefined,
            junctions: null,
        };
    }

    const cutoutR = badgeRadius + 2;
    const outerR = cutoutR + JR;

    /*
     * Rectangular: центр бейджа сдвигаем в правый верхний угол по диагонали 45° относительно скругления (cr).
     * Дальше ищем две точки стыка окружности outerR с "внутренним" прямоугольником маски:
     * 1) с правой границей x = w - JR (получаем y через уравнение окружности),
     * 2) с верхней границей y = JR (получаем x через уравнение окружности).
     * Если подкоренные выражения отрицательные, стыка нет (junctions = null).
     */
    if (shape === 'rectangular') {
        const cr = Math.round(Math.min(w, h) * 0.22);
        const badgeX = w - cr + (cr + OFFSET) * SIN_45;
        const badgeY = cr - (cr + OFFSET) * SIN_45;

        const edgeRight = w - JR;
        const dx = edgeRight - badgeX;
        const dySq = outerR * outerR - dx * dx;

        const edgeTop = JR;
        const dy = edgeTop - badgeY;
        const dxSq = outerR * outerR - dy * dy;

        const junctions: [JunctionPoint, JunctionPoint] | null =
            dySq >= 0 && dxSq >= 0
                ? [
                      { cx: edgeRight, cy: badgeY + Math.sqrt(dySq) },
                      { cx: badgeX - Math.sqrt(dxSq), cy: edgeTop },
                  ]
                : null;

        return { badgeX, badgeY, cutoutR, cr, junctions };
    }

    const rx = w / 2;
    const ry = h / 2;
    const badgeX = rx + (rx + OFFSET) * SIN_45;
    const badgeY = ry - (ry + OFFSET) * SIN_45;

    const junctions = intersectEllipseCircle({
        ecx: rx,
        ecy: ry,
        erx: rx - JR,
        ery: ry - JR,
        ccx: badgeX,
        ccy: badgeY,
        cr: outerR,
    });

    return { badgeX, badgeY, cutoutR, junctions };
};
