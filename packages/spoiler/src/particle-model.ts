import { FONT, FULL_CIRCLE, getCloudHeight, PARTICLES } from './constants';
import { type Rect } from './particle-utils';

const RANDOM_MODULUS = 2147483647;
const RANDOM_MULTIPLIER = 16807;
const SEED_MULTIPLIER = 48271;
const SEED_REMAINDER = 65521;

export type Particle = {
    cloudX: number;
    cloudY: number;
    radius: number;
    phase: number;
    speed: number;
    wobbleX: number;
    wobbleY: number;
    opacity: number;
    opacityPhase: number;
    opacitySpeed: number;
    pointerX: number;
    pointerY: number;
};

/** Числовой seed ячейки и Park–Miller дают повторяемый узор без битовых операций. */
const createRandom = (group: number, row: number, column: number) => {
    let state = 1;

    [group, row, column].forEach((coordinate) => {
        state = (state * SEED_MULTIPLIER + coordinate + 1) % RANDOM_MODULUS;
        // Нелинейный шаг устраняет одинаковое смещение соседних ячеек; вычисления точны в Number.
        state = (state + (state % SEED_REMAINDER) ** 2) % RANDOM_MODULUS || 1;
    });

    return () => {
        state = (state * RANDOM_MULTIPLIER) % RANDOM_MODULUS;

        return (state - 1) / (RANDOM_MODULUS - 1);
    };
};

const createParticle = (
    random: () => number,
    cell: Rect,
    bounds: Rect,
    scale: number,
): Particle | undefined => {
    const x =
        cell.x + (PARTICLES.cellInset + random() * (1 - 2 * PARTICLES.cellInset)) * cell.width;
    const y =
        cell.y + (PARTICLES.cellInset + random() * (1 - 2 * PARTICLES.cellInset)) * cell.height;

    if (x < bounds.x || x > bounds.x + bounds.width || y > bounds.height) return undefined;
    const radius = Math.min(
        (PARTICLES.radius.min + random() ** 2 * PARTICLES.radius.range) * scale,
        bounds.width / 2,
        bounds.height / 2,
    );
    const cloudX = Math.max(bounds.x + radius, Math.min(bounds.x + bounds.width - radius, x));
    const cloudY = Math.max(radius, Math.min(bounds.height - radius, y));
    const phase = random() * FULL_CIRCLE;
    const speed = PARTICLES.speed.min + random() * PARTICLES.speed.range;
    const wobbleX = Math.min(
        (PARTICLES.wobbleX.min + random() * PARTICLES.wobbleX.range) * scale,
        Math.max(
            0,
            Math.min(cloudX - bounds.x - radius, bounds.x + bounds.width - radius - cloudX) / 2,
        ),
    );
    const wobbleY = Math.min(
        (PARTICLES.wobbleY.min + random() * PARTICLES.wobbleY.range) * scale,
        Math.max(0, Math.min(cloudY - radius, bounds.height - radius - cloudY) / 2),
    );

    return {
        cloudX,
        cloudY,
        radius,
        phase,
        speed,
        wobbleX,
        wobbleY,
        opacity: PARTICLES.opacity.min + random() * PARTICLES.opacity.range,
        opacityPhase: random() * FULL_CIRCLE,
        opacitySpeed:
            FULL_CIRCLE /
            (PARTICLES.twinkleDuration.min + random() * PARTICLES.twinkleDuration.range),
        pointerX: 0,
        pointerY: 0,
    };
};

/** Базовая плотность одинакова; у блоков прореживается только полоса вдоль внешнего края. */
export const createParticleGroups = (
    rects: Rect[],
    fontSize: number,
    edgeSpread: number,
    mode: 'text' | 'element',
) => {
    const fontScale = Math.max(FONT.minScale, Math.min(FONT.maxScale, fontSize / FONT.base));
    const density = (PARTICLES.density * Math.min(fontScale, 1)) / getCloudHeight(fontSize);
    const area = rects.reduce(
        (total, rect) => total + (rect.width + edgeSpread * 2) * rect.height,
        0,
    );
    const cellSize = Math.sqrt(Math.max(1 / density, area / PARTICLES.limit));
    let remaining = PARTICLES.limit;

    return rects.map((rect, group) => {
        const columns = Math.ceil((rect.width + edgeSpread * 2) / cellSize);
        const rows = Math.ceil(rect.height / cellSize);
        const bounds = {
            x: -edgeSpread,
            y: 0,
            width: rect.width + edgeSpread * 2,
            height: rect.height,
        };
        const particles: Particle[] = [];
        const edgeWidth =
            mode === 'element'
                ? Math.min(
                      PARTICLES.elementEdge.width,
                      rect.width * PARTICLES.elementEdge.maxSizeRatio,
                      rect.height * PARTICLES.elementEdge.maxSizeRatio,
                  )
                : 0;

        for (let row = 0; row < rows && remaining > 0; row += 1) {
            for (let column = 0; column < columns && remaining > 0; column += 1) {
                const random = createRandom(group, row, column);
                const particle = createParticle(
                    random,
                    {
                        x: column * cellSize - edgeSpread,
                        y: row * cellSize,
                        width: cellSize,
                        height: cellSize,
                    },
                    bounds,
                    Math.min(fontScale, FONT.maxParticleScale),
                );

                if (particle) {
                    // Лимит считаем до прореживания: рисунок в центре не меняется даже у больших блоков.
                    remaining -= 1;
                    let edgeDensity = 1;

                    if (edgeWidth) {
                        const distance = Math.min(
                            particle.cloudX,
                            particle.cloudY,
                            rect.width - particle.cloudX,
                            rect.height - particle.cloudY,
                        );
                        const progress = Math.max(0, Math.min(1, distance / edgeWidth));
                        const fade = progress * progress * (3 - 2 * progress);

                        edgeDensity =
                            PARTICLES.elementEdge.minDensity +
                            (1 - PARTICLES.elementEdge.minDensity) * fade;
                    }
                    if (!edgeWidth || random() <= edgeDensity) particles.push(particle);
                }
            }
        }

        return particles;
    });
};
