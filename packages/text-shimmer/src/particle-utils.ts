export type Point = {
    x: number;
    y: number;
};

export type Particle = {
    targetX: number;
    targetY: number;
    cloudX: number;
    cloudY: number;
    fromX: number;
    fromY: number;
    x: number;
    y: number;
    radius: number;
    opacity: number;
    opacityPhase: number;
    opacitySpeed: number;
    phase: number;
    speed: number;
    wobbleX: number;
    wobbleY: number;
};

export const SCATTER_DURATION = 210;
export const ASSEMBLE_DURATION = 180;
export const CANVAS_PADDING = 24;
export const MAX_DEVICE_PIXEL_RATIO = 2;

const MIN_AUTO_PARTICLE_COUNT = 16;
const MAX_AUTO_PARTICLE_COUNT = 160;
const MIN_CUSTOM_PARTICLE_COUNT = 12;
const MAX_CUSTOM_PARTICLE_COUNT = 300;
const SAMPLE_STEP = 2;
const CLOUD_HORIZONTAL_EDGE_SPREAD = 4;
const CLOUD_VERTICAL_INSET = 2;
const CLOUD_CELL_INSET = 0.16;
const MAX_WOBBLE_DISTANCE_MULTIPLIER = 2;

/**
 * Кегль, для которого подобраны базовые размеры частиц. Остальные размеры текста
 * масштабируются относительно него, иначе на мелком тексте облако выглядит
 * неоправданно плотным и крупнозернистым.
 */
const REFERENCE_FONT_SIZE = 16;
const MIN_FONT_SCALE = 0.6;
const MAX_FONT_SCALE = 2.5;

/**
 * Радиус и амплитуда дрожания растут медленнее количества частиц: на крупном
 * заголовке облако должно оставаться мелкозернистым, а не набираться из клякс.
 */
const MAX_PARTICLE_SIZE_SCALE = 1.25;

export const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

export const interpolate = (from: number, to: number, progress: number) =>
    from + (to - from) * progress;

const hashString = (value: string) => {
    let hash = 7;

    for (let index = 0; index < value.length; index += 1) {
        hash = (hash * 31 + value.charCodeAt(index)) % 2147483647;
    }

    return hash || 1;
};

const createRandom = (seed: number) => {
    let state = seed % 2147483647;

    return () => {
        state = (state * 16807) % 2147483647;

        return (state - 1) / 2147483646;
    };
};

const shuffle = <T>(items: T[], random: () => number) => {
    for (let index = items.length - 1; index > 0; index -= 1) {
        const replacementIndex = Math.floor(random() * (index + 1));

        // eslint-disable-next-line no-param-reassign
        [items[index], items[replacementIndex]] = [items[replacementIndex], items[index]];
    }

    return items;
};

const getFont = (style: CSSStyleDeclaration) =>
    [
        style.fontStyle || 'normal',
        style.fontVariant || 'normal',
        style.fontWeight || '400',
        style.fontSize || '16px',
        style.fontFamily || 'sans-serif',
    ].join(' ');

const transformText = (text: string, textTransform: string) => {
    if (textTransform === 'uppercase') {
        return text.toLocaleUpperCase();
    }

    if (textTransform === 'lowercase') {
        return text.toLocaleLowerCase();
    }

    if (textTransform === 'capitalize') {
        return text.replace(/(^|\s)\S/g, (character) => character.toLocaleUpperCase());
    }

    return text;
};

const getLinePosition = (context: CanvasRenderingContext2D, line: string, centerY: number) => {
    const metrics = context.measureText(line || ' ');
    const ascent = metrics.fontBoundingBoxAscent;
    const descent = metrics.fontBoundingBoxDescent;

    if (Number.isFinite(ascent) && Number.isFinite(descent) && ascent + descent > 0) {
        context.textBaseline = 'alphabetic';

        return centerY + (ascent - descent) / 2;
    }

    context.textBaseline = 'middle';

    return centerY;
};

const drawLine = (
    context: CanvasRenderingContext2D,
    line: string,
    centerX: number,
    centerY: number,
    letterSpacing: number,
) => {
    const characters = Array.from(line);
    const textY = getLinePosition(context, line, centerY);

    if (!letterSpacing || characters.length < 2) {
        context.textAlign = 'center';
        context.fillText(line, centerX, textY);

        return;
    }

    const textWidth =
        characters.reduce((width, character) => width + context.measureText(character).width, 0) +
        letterSpacing * (characters.length - 1);
    let cursor = centerX - textWidth / 2;

    context.textAlign = 'left';

    characters.forEach((character) => {
        context.fillText(character, cursor, textY);
        cursor += context.measureText(character).width + letterSpacing;
    });
};

const createFallbackTargets = (width: number, height: number) => {
    const count = Math.max(1, Math.round(width / SAMPLE_STEP));

    return Array.from({ length: count }, (_, index) => ({
        x: ((index + 0.5) / count) * width,
        y: height / 2,
    }));
};

const readMaskTargets = (context: CanvasRenderingContext2D, width: number, height: number) => {
    const pixels = context.getImageData(0, 0, width, height).data;
    const targets: Point[] = [];

    for (let y = 0; y < height; y += SAMPLE_STEP) {
        for (let x = 0; x < width; x += SAMPLE_STEP) {
            const alpha = pixels[(y * width + x) * 4 + 3];

            if (alpha > 72) {
                targets.push({ x: x + SAMPLE_STEP / 2, y: y + SAMPLE_STEP / 2 });
            }
        }
    }

    return targets;
};

const createTextTargets = (
    textElement: HTMLElement,
    style: CSSStyleDeclaration,
    width: number,
    height: number,
) => {
    const text = transformText(textElement.textContent || '', style.textTransform);

    if (!text) {
        return [];
    }

    const mask = document.createElement('canvas');
    const context = mask.getContext('2d');

    mask.width = width;
    mask.height = height;

    if (!context) {
        return createFallbackTargets(width, height);
    }

    const fontSize = parseFloat(style.fontSize) || 16;
    const parsedLineHeight = parseFloat(style.lineHeight);
    const lineHeight = Number.isNaN(parsedLineHeight) ? fontSize * 1.2 : parsedLineHeight;
    const letterSpacing = parseFloat(style.letterSpacing) || 0;
    const lines = text.split(/\r?\n/);
    const firstLineCenter = height / 2 - ((lines.length - 1) * lineHeight) / 2;

    context.font = style.font || getFont(style);
    context.direction = style.direction === 'rtl' ? 'rtl' : 'ltr';
    context.fillStyle = '#000000';

    lines.forEach((line, index) => {
        drawLine(context, line, width / 2, firstLineCenter + index * lineHeight, letterSpacing);
    });

    try {
        const targets = readMaskTargets(context, width, height);

        return targets.length ? targets : createFallbackTargets(width, height);
    } catch {
        return createFallbackTargets(width, height);
    }
};

export const getFontScale = (style: CSSStyleDeclaration) => {
    const fontSize = parseFloat(style.fontSize) || REFERENCE_FONT_SIZE;

    return clamp(fontSize / REFERENCE_FONT_SIZE, MIN_FONT_SCALE, MAX_FONT_SCALE);
};

const getParticleCount = (width: number, fontScale: number, requestedCount?: number) => {
    if (requestedCount !== undefined && Number.isFinite(requestedCount)) {
        return clamp(
            Math.round(requestedCount),
            MIN_CUSTOM_PARTICLE_COUNT,
            MAX_CUSTOM_PARTICLE_COUNT,
        );
    }

    /*
     * Без множителя количество зависело бы только от ширины, а высота строки
     * уменьшается вместе с кеглем — на мелком тексте точки ложились бы вплотную.
     */
    return clamp(
        Math.round(width * 0.58 * fontScale),
        MIN_AUTO_PARTICLE_COUNT,
        MAX_AUTO_PARTICLE_COUNT,
    );
};

const createCloudTargets = (
    width: number,
    height: number,
    particleCount: number,
    random: () => number,
) => {
    const aspectRatio = width / Math.max(height, 1);
    const rowCount = clamp(Math.round(Math.sqrt(particleCount / aspectRatio)), 1, particleCount);
    const baseParticlesPerRow = Math.floor(particleCount / rowCount);
    const rowsWithExtraParticle = particleCount % rowCount;
    const cloudWidth = width + CLOUD_HORIZONTAL_EDGE_SPREAD * 2;
    const cloudHeight = Math.max(1, height - CLOUD_VERTICAL_INSET * 2);
    const targets: Point[] = [];

    for (let row = 0; row < rowCount; row += 1) {
        const particlesInRow = baseParticlesPerRow + (row < rowsWithExtraParticle ? 1 : 0);

        for (let column = 0; column < particlesInRow; column += 1) {
            const xJitter = CLOUD_CELL_INSET + random() * (1 - CLOUD_CELL_INSET * 2);
            const yJitter = CLOUD_CELL_INSET + random() * (1 - CLOUD_CELL_INSET * 2);

            targets.push({
                x:
                    CANVAS_PADDING -
                    CLOUD_HORIZONTAL_EDGE_SPREAD +
                    ((column + xJitter) / particlesInRow) * cloudWidth,
                y:
                    CANVAS_PADDING +
                    CLOUD_VERTICAL_INSET +
                    ((row + yJitter) / rowCount) * cloudHeight,
            });
        }
    }

    return targets.sort((first, second) => first.x - second.x);
};

export const createParticles = (
    textElement: HTMLElement,
    style: CSSStyleDeclaration,
    width: number,
    height: number,
    requestedCount?: number,
) => {
    const targets = createTextTargets(textElement, style, width, height);

    if (!targets.length) {
        return [];
    }

    const fontScale = getFontScale(style);
    const sizeScale = Math.min(fontScale, MAX_PARTICLE_SIZE_SCALE);
    /*
     * Базовая плотность подобрана для REFERENCE_FONT_SIZE и крупнее, поэтому
     * разрежаем облако только вниз — на кеглях мельче опорного.
     */
    const particleCount = getParticleCount(width, Math.min(fontScale, 1), requestedCount);
    const random = createRandom(
        hashString(`${textElement.textContent || ''}:${width}:${height}:${particleCount}`),
    );
    const shuffledTargets = shuffle([...targets], random);
    const particleTargets = Array.from(
        { length: particleCount },
        (_, index) => shuffledTargets[index % shuffledTargets.length],
    ).sort((first, second) => first.x - second.x);
    const cloudTargets = createCloudTargets(width, height, particleCount, random);

    return Array.from({ length: particleCount }, (_, index): Particle => {
        const target = particleTargets[index];
        const cloudTarget = cloudTargets[index];
        const targetX = target.x + CANVAS_PADDING + (random() - 0.5) * SAMPLE_STEP;
        const targetY = target.y + CANVAS_PADDING + (random() - 0.5) * SAMPLE_STEP;
        const radius = (0.55 + random() ** 2 * 1.35) * sizeScale;
        const opacity = 0.12 + random() * 0.38;
        const opacityPhase = random() * Math.PI * 2;
        const opacitySpeed = 0.75 + random() * 0.6;
        const phase = random() * Math.PI * 2;
        const speed = 0.9 + random();
        const wobbleX = (0.8 + random() * 2.4) * sizeScale;
        const wobbleY = (0.5 + random() * 1.8) * sizeScale;
        const verticalTravel = wobbleY * MAX_WOBBLE_DISTANCE_MULTIPLIER;
        const minCloudY = CANVAS_PADDING + CLOUD_VERTICAL_INSET + verticalTravel;
        const maxCloudY = CANVAS_PADDING + height - CLOUD_VERTICAL_INSET - verticalTravel;
        const cloudY =
            minCloudY < maxCloudY
                ? clamp(cloudTarget.y, minCloudY, maxCloudY)
                : CANVAS_PADDING + height / 2;

        return {
            targetX,
            targetY,
            cloudX: cloudTarget.x,
            cloudY,
            fromX: targetX,
            fromY: targetY,
            x: targetX,
            y: targetY,
            radius,
            opacity,
            opacityPhase,
            opacitySpeed,
            phase,
            speed,
            wobbleX,
            wobbleY,
        };
    });
};
