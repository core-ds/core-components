import { subscribeAnimationFrame } from './animation';
import { type Rect } from './particle-utils';

const MAX_PARTICLES = 5000;
const MAX_CANVAS_PIXELS = 4000000;
const SUPERSAMPLING = 2;
const HORIZONTAL_EDGE_SPREAD = 4;
const COLOR_SYNC_INTERVAL = 1;

type Mode = 'text' | 'element';

type Particle = {
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
};

/** Один seed даёт тот же рисунок независимо от ререндеров и других экземпляров. */
const createRandom = (seed: string) => {
    let state = 2166136261;

    for (let index = 0; index < seed.length; index += 1) {
        // Побитовые операции нужны для детерминированного FNV-хеша строки.
        // eslint-disable-next-line no-bitwise
        state = Math.imul(state ^ seed.charCodeAt(index), 16777619);
    }
    // Перемешивание seed убирает корреляцию между соседними ячейками сетки.
    // eslint-disable-next-line no-bitwise
    state = (state >>> 0) % 2147483647 || 1;

    return () => {
        state = (state * 16807) % 2147483647;

        return (state - 1) / 2147483646;
    };
};

/** Ячейка сохраняет свою точку при смене содержимого и изменении соседних ячеек. */
const createParticle = (
    random: () => number,
    cell: Rect,
    bounds: Rect,
    scale: number,
): Particle | undefined => {
    const x = cell.x + (0.16 + random() * 0.68) * cell.width;
    const y = cell.y + (0.16 + random() * 0.68) * cell.height;

    // Неполные крайние ячейки обрезаются, а остальные не растягиваются за контейнером.
    if (x < bounds.x || x > bounds.x + bounds.width || y > bounds.height) return undefined;
    const radius = Math.min(
        (0.55 + random() ** 2 * 1.35) * scale,
        bounds.width / 2,
        bounds.height / 2,
    );
    const cloudX = Math.max(bounds.x + radius, Math.min(bounds.x + bounds.width - radius, x));
    const cloudY = Math.max(radius, Math.min(bounds.height - radius, y));
    const phase = random() * Math.PI * 2;
    const speed = 0.9 + random();
    // У границы уменьшаем только размах, не сдвигая точки к середине строки.
    const wobbleX = Math.min(
        (0.8 + random() * 2.4) * scale,
        Math.max(
            0,
            Math.min(cloudX - bounds.x - radius, bounds.x + bounds.width - radius - cloudX) / 2,
        ),
    );
    const wobbleY = Math.min(
        (0.5 + random() * 1.8) * scale,
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
        opacity: 0.12 + random() * 0.38,
        opacityPhase: random() * Math.PI * 2,
        opacitySpeed: 0.75 + random() * 0.6,
    };
};

/** Один кешируемый контур всех строк: радиус из CSS без построения пути в каждом кадре. */
const createParticleMask = (rects: Rect[], borderRadius: number, edgeSpread: number): Path2D => {
    const path = new Path2D();

    rects.forEach((rect) => {
        const x = rect.x - edgeSpread;
        const { y, height } = rect;
        const width = rect.width + edgeSpread * 2;
        const radius = Math.min(borderRadius, width / 2, height / 2);

        path.moveTo(x + radius, y);
        path.arcTo(x + width, y, x + width, y + height, radius);
        path.arcTo(x + width, y + height, x, y + height, radius);
        path.arcTo(x, y + height, x, y, radius);
        path.arcTo(x, y, x + width, y, radius);
        path.closePath();
    });

    return path;
};

/** Рисует частицы вне React; оформление и движение закреплены внутри дизайн-системы. */
export class ParticleEngine {
    private rects: Rect[] = [];

    private particles: Particle[][] = [];

    private unsubscribe: (() => void) | undefined;

    private elapsed = 0;

    private colorSyncElapsed = 0;

    private scaleX = 1;

    private scaleY = 1;

    private fontScale = 1;

    private fontSize = 16;

    private mask: Path2D | undefined;

    private color = '';

    private borderRadius = 0;

    private left = 0;

    private top = 0;

    private get edgeSpread() {
        return this.mode === 'text' ? HORIZONTAL_EDGE_SPREAD : 0;
    }

    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
        private mode: Mode = 'text',
    ) {}

    /** Получает готовое оформление; DOM-стили и метрики шрифта остаются в хуке. */
    configure(borderRadius: number, fontSize = 16) {
        this.fontSize = fontSize;
        this.fontScale = Math.max(0.6, Math.min(2.5, fontSize / 16));
        this.borderRadius = Math.max(0, borderRadius);
    }

    /** Синхронизирует цвет с CSS без чтения computed styles в каждом кадре. */
    syncColor() {
        const { color } = getComputedStyle(this.canvas);

        if (color === this.color) return false;
        this.color = color;

        return true;
    }

    /** Перерисовывает текущую раскладку после внешнего обновления оформления. */
    redraw() {
        this.paint();
    }

    layout(rectangles: Rect[]) {
        const rects = rectangles.filter(({ width, height }) => width > 0 && height > 0);

        this.rects = rects;
        this.mask = createParticleMask(rects, this.borderRadius, this.edgeSpread);
        if (!rects.length) {
            this.particles = [];
            this.setPlaying(false);
            this.syncColor();
            this.paint();

            return;
        }

        this.left = Math.min(...rects.map((rect) => rect.x)) - this.edgeSpread;
        this.top = Math.min(...rects.map((rect) => rect.y));
        const width =
            Math.max(...rects.map((rect) => rect.x + rect.width)) + this.edgeSpread - this.left;
        const height = Math.max(...rects.map((rect) => rect.y + rect.height)) - this.top;

        const scale = Math.min(
            // Дополнительные отсчёты сглаживают край маленьких кругов при уменьшении Canvas.
            (window.devicePixelRatio || 1) * SUPERSAMPLING,
            4,
            8192 / width,
            8192 / height,
            Math.sqrt(MAX_CANVAS_PIXELS / (width * height)),
        );
        const pixelWidth = Math.max(1, Math.floor(width * scale));
        const pixelHeight = Math.max(1, Math.floor(height * scale));

        // Дробные CSS-размеры точно совпадают с целочисленным буфером, без растяжения кругов.
        this.scaleX = pixelWidth / width;
        this.scaleY = pixelHeight / height;

        if (this.canvas.width !== pixelWidth) this.canvas.width = pixelWidth;
        if (this.canvas.height !== pixelHeight) this.canvas.height = pixelHeight;
        if (this.mode === 'text') {
            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;
            this.canvas.style.left = `${this.left}px`;
            this.canvas.style.top = `${this.top}px`;
        }

        // Одинаковая плотность на единицу площади для строки, иконки и большого блока.
        const lineHeight = Math.max(1, Math.round(this.fontSize * 0.35) * 2);
        const density = (0.58 * Math.min(this.fontScale, 1)) / lineHeight;
        const area = rects.reduce(
            (total, rect) => total + (rect.width + this.edgeSpread * 2) * rect.height,
            0,
        );
        const cellSize = Math.sqrt(Math.max(1 / density, area / MAX_PARTICLES));
        let remaining = MAX_PARTICLES;

        this.particles = rects.map((rect, groupIndex) => {
            const columns = Math.ceil((rect.width + this.edgeSpread * 2) / cellSize);
            const rows = Math.ceil(rect.height / cellSize);
            const bounds = {
                x: -this.edgeSpread,
                y: 0,
                width: rect.width + this.edgeSpread * 2,
                height: rect.height,
            };
            const particles: Particle[] = [];

            for (let row = 0; row < rows && remaining > 0; row += 1) {
                for (let column = 0; column < columns && remaining > 0; column += 1) {
                    const particle = createParticle(
                        createRandom(`${groupIndex}:${row}:${column}`),
                        {
                            x: column * cellSize - this.edgeSpread,
                            y: row * cellSize,
                            width: cellSize,
                            height: cellSize,
                        },
                        bounds,
                        Math.min(this.fontScale, 1.25),
                    );

                    if (particle) {
                        particles.push(particle);
                        remaining -= 1;
                    }
                }
            }

            return particles;
        });
        this.syncColor();
        this.paint();
    }

    setPlaying(playing: boolean) {
        if (!playing || !this.rects.length) {
            this.unsubscribe?.();
            this.unsubscribe = undefined;
        } else if (!this.unsubscribe) {
            this.colorSyncElapsed = 0;
            if (this.syncColor()) this.paint();
            this.unsubscribe = subscribeAnimationFrame(this.tick);
        }
    }

    destroy() {
        this.setPlaying(false);
    }

    private tick = (seconds: number) => {
        this.elapsed += seconds;
        this.colorSyncElapsed += seconds;
        if (this.colorSyncElapsed >= COLOR_SYNC_INTERVAL) {
            this.colorSyncElapsed %= COLOR_SYNC_INTERVAL;
            this.syncColor();
        }
        this.paint();
    };

    private paint() {
        const { context } = this;

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.setTransform(
            this.scaleX,
            0,
            0,
            this.scaleY,
            -this.left * this.scaleX,
            -this.top * this.scaleY,
        );
        if (!this.color || !this.mask) return;
        context.save();
        context.clip(this.mask);
        context.fillStyle = this.color;
        this.rects.forEach((rect, index) => {
            this.particles[index].forEach((particle) => {
                const { phase, speed } = particle;
                const offsetX =
                    (Math.sin(this.elapsed * speed + phase) - Math.sin(phase)) * particle.wobbleX;
                const offsetY =
                    (Math.cos(this.elapsed * speed * 0.83 + phase) - Math.cos(phase)) *
                    particle.wobbleY;
                const opacityProgress =
                    (Math.sin(this.elapsed * particle.opacitySpeed + particle.opacityPhase) + 1) /
                    2;

                context.globalAlpha = particle.opacity * (0.38 + opacityProgress * 0.62);
                context.beginPath();
                context.arc(
                    rect.x + particle.cloudX + offsetX,
                    rect.y + particle.cloudY + offsetY,
                    particle.radius,
                    0,
                    Math.PI * 2,
                );
                context.fill();
            });
        });
        context.restore();
    }
}
