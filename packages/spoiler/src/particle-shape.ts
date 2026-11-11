import { type Point } from './particle-interaction';
import { type Particle } from './particle-model';
import { type Rect } from './particle-utils';

type Corner = Point & { radiusX: number; radiusY: number; directionX: number; directionY: number };
export type ElementShape = { width: number; height: number; corners: Corner[] };

// Для смещения в несколько пикселей 10 шагов дают точность меньше субпикселя.
const CONTAINMENT_STEPS = 10;

const resolveLength = (value: string, size: number) =>
    Math.max(0, parseFloat(value) || 0) * (value?.endsWith('%') ? size / 100 : 1);

/** Геометрия padding-box: проценты и пересечение радиусов разрешаются по правилам CSS. */
export const createElementShape = (
    { width, height }: Rect,
    style: CSSStyleDeclaration,
): ElementShape => {
    const left = parseFloat(style.borderLeftWidth) || 0;
    const right = parseFloat(style.borderRightWidth) || 0;
    const top = parseFloat(style.borderTopWidth) || 0;
    const bottom = parseFloat(style.borderBottomWidth) || 0;
    const outerWidth = width + left + right;
    const outerHeight = height + top + bottom;
    const radii = [
        style.borderTopLeftRadius,
        style.borderTopRightRadius,
        style.borderBottomRightRadius,
        style.borderBottomLeftRadius,
    ].map((value) => {
        const [horizontal = '0', vertical = horizontal] = (value || '').split(/\s+/);

        return {
            x: resolveLength(horizontal, outerWidth),
            y: resolveLength(vertical, outerHeight),
        };
    });
    const scale = Math.min(
        1,
        outerWidth / (radii[0].x + radii[1].x || 1),
        outerWidth / (radii[2].x + radii[3].x || 1),
        outerHeight / (radii[0].y + radii[3].y || 1),
        outerHeight / (radii[1].y + radii[2].y || 1),
    );
    const corners = radii.map((radius, index) => {
        const isLeft = index === 0 || index === 3;
        const isTop = index < 2;
        const horizontal = Math.max(0, radius.x * scale - (isLeft ? left : right));
        const vertical = Math.max(0, radius.y * scale - (isTop ? top : bottom));
        const radiusX = vertical ? horizontal : 0;
        const radiusY = horizontal ? vertical : 0;

        return {
            x: isLeft ? radiusX : width - radiusX,
            y: isTop ? radiusY : height - radiusY,
            radiusX,
            radiusY,
            directionX: isLeft ? -1 : 1,
            directionY: isTop ? -1 : 1,
        };
    });

    return { width, height, corners };
};

const isInCorner = (corner: Corner, x: number, y: number) =>
    corner.radiusX > 0 &&
    corner.radiusY > 0 &&
    (x - corner.x) * corner.directionX > 0 &&
    (y - corner.y) * corner.directionY > 0;

/** Безопасный отступ до контура; для эллипса — нижняя оценка расстояния в CSS-пикселях. */
export const getShapeInset = (shape: ElementShape, x: number, y: number) => {
    const inset = Math.min(x, y, shape.width - x, shape.height - y);

    for (const corner of shape.corners) {
        if (isInCorner(corner, x, y)) {
            const normalized = Math.hypot(
                (x - corner.x) / corner.radiusX,
                (y - corner.y) / corner.radiusY,
            );

            return Math.min(inset, (1 - normalized) * Math.min(corner.radiusX, corner.radiusY));
        }
    }

    return inset;
};

/** Сохраняет весь круг внутри скругления, без выделения объектов на каждом кадре. */
export const constrainToShape = (
    shape: ElementShape,
    point: Point,
    origin: Rect,
    particle: Pick<Particle, 'cloudX' | 'cloudY' | 'radius'>,
) => {
    const x = point.x - origin.x;
    const y = point.y - origin.y;

    if (getShapeInset(shape, x, y) >= particle.radius) return;
    const deltaX = x - particle.cloudX;
    const deltaY = y - particle.cloudY;
    let inside = 0;
    let outside = 1;

    // Исходная позиция уже внутри маски. Ограничиваем только выходящую за край часть движения.
    for (let step = 0; step < CONTAINMENT_STEPS; step += 1) {
        const progress = (inside + outside) / 2;
        const inset = getShapeInset(
            shape,
            particle.cloudX + deltaX * progress,
            particle.cloudY + deltaY * progress,
        );

        if (inset >= particle.radius) inside = progress;
        else outside = progress;
    }
    // Общая рабочая точка движка: изменяем на месте, не создаём объект для каждой частицы.
    // eslint-disable-next-line no-param-reassign
    point.x = origin.x + particle.cloudX + deltaX * inside;
    // eslint-disable-next-line no-param-reassign
    point.y = origin.y + particle.cloudY + deltaY * inside;
};

/** Контур с четырьмя независимыми эллиптическими углами, включая круг и капсулу. */
export const createElementMask = (shape: ElementShape, origin: Rect) => {
    const path = new Path2D();

    shape.corners.forEach((corner, index) => {
        const start = ((index - 2) * Math.PI) / 2;
        const x = origin.x + corner.x;
        const y = origin.y + corner.y;
        const startX = x + Math.cos(start) * corner.radiusX;
        const startY = y + Math.sin(start) * corner.radiusY;

        if (index === 0) path.moveTo(startX, startY);
        else path.lineTo(startX, startY);
        if (corner.radiusX && corner.radiusY)
            path.ellipse(x, y, corner.radiusX, corner.radiusY, 0, start, start + Math.PI / 2);
    });
    path.closePath();

    return path;
};
