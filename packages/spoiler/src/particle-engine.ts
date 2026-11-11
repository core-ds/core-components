import { subscribeAnimationFrame } from './animation';
import {
    CANVAS,
    COLOR_SYNC_INTERVAL,
    DEFAULT_TRANSITION_MS,
    DISSOLVE,
    FONT,
    FULL_CIRCLE,
    MILLISECONDS_PER_SECOND,
    PARTICLES,
    POINTER,
} from './constants';
import { displaceWithinBounds, type Point, updatePointerOffset } from './particle-interaction';
import { createParticleGroups, type Particle } from './particle-model';
import { constrainToShape, createElementMask, type ElementShape } from './particle-shape';
import { type Rect } from './particle-utils';

type Mode = 'text' | 'element';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/** Один контур строк со скруглениями; arcTo поддерживается и в iOS 14. */
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

/** Рисует облако и прерываемое растворение частиц вне React. */
export class ParticleEngine {
    private rects: Rect[] = [];

    private particles: Particle[][] = [];

    private unsubscribe: (() => void) | undefined;

    private elapsed = 0;

    private colorSyncElapsed = 0;

    private scaleX = 1;

    private scaleY = 1;

    private fontSize: number = FONT.base;

    private mask: Path2D | undefined;

    private elementShape: ElementShape | undefined;

    private point: Point = { x: 0, y: 0 };

    private color = '';

    private borderRadius = 0;

    private left = 0;

    private top = 0;

    private playing = false;

    private pointer: Point | undefined;

    private pointerSettling = false;

    private progress = 0;

    private target = 0;

    private transitionUpdatedAt = 0;

    private duration = DEFAULT_TRANSITION_MS / MILLISECONDS_PER_SECOND;

    private get edgeSpread() {
        return this.mode === 'text' ? PARTICLES.textEdgeSpread : 0;
    }

    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
        private mode: Mode = 'text',
    ) {}

    /** Получает оформление из хука; чтения DOM в цикле движения нет. */
    configure(
        borderRadius: number,
        fontSize: number = FONT.base,
        durationMs = DEFAULT_TRANSITION_MS,
    ) {
        this.fontSize = fontSize;
        this.borderRadius = Math.max(0, borderRadius);
        this.duration = Math.max(0, durationMs) / MILLISECONDS_PER_SECOND;
    }

    /** Обновляет цвет без неявной отрисовки. */
    syncColor() {
        const color =
            this.canvas.ownerDocument.defaultView?.getComputedStyle(this.canvas).color || '';

        if (color === this.color) return false;
        this.color = color;

        return true;
    }

    redraw() {
        this.paint();
    }

    /** Переводит координаты мыши в систему canvas, включая CSS-масштабирование и переносы строк. */
    setPointer(clientX: number, clientY: number) {
        if (!this.playing || this.target === 1 || !this.rects.length) return;
        const bounds = this.canvas.getBoundingClientRect();

        if (!bounds.width || !bounds.height) return;
        this.pointer = {
            x:
                this.left +
                ((clientX - bounds.left) * this.canvas.width) / (bounds.width * this.scaleX),
            y:
                this.top +
                ((clientY - bounds.top) * this.canvas.height) / (bounds.height * this.scaleY),
        };
    }

    clearPointer() {
        this.pointer = undefined;
    }

    layout(rectangles: Rect[], elementShape?: ElementShape) {
        const rects = rectangles.filter(({ width, height }) => width > 0 && height > 0);

        this.rects = rects;
        this.clearPointer();
        this.elementShape = this.mode === 'element' && rects.length ? elementShape : undefined;
        this.mask = this.elementShape
            ? createElementMask(this.elementShape, rects[0])
            : createParticleMask(rects, this.borderRadius, this.edgeSpread);
        if (!rects.length) {
            this.particles = [];
            this.updateSubscription();
            this.paint();

            return;
        }

        this.left = Math.min(...rects.map((rect) => rect.x)) - this.edgeSpread;
        this.top = Math.min(...rects.map((rect) => rect.y));
        const width =
            Math.max(...rects.map((rect) => rect.x + rect.width)) + this.edgeSpread - this.left;
        const height = Math.max(...rects.map((rect) => rect.y + rect.height)) - this.top;
        const dpr = this.canvas.ownerDocument.defaultView?.devicePixelRatio || 1;
        const scale = Math.min(
            dpr * CANVAS.supersampling,
            CANVAS.maxScale,
            CANVAS.side / width,
            CANVAS.side / height,
            Math.sqrt(CANVAS.pixels / (width * height)),
        );
        const pixelWidth = Math.max(1, Math.floor(width * scale));
        const pixelHeight = Math.max(1, Math.floor(height * scale));

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

        this.particles = createParticleGroups(
            rects,
            this.fontSize,
            this.edgeSpread,
            this.mode,
            this.elementShape,
        );
        this.syncColor();
        // Изменение размера очищает буфер: рисуем сразу, даже когда следующий тик ещё не наступил.
        this.paint();
        this.updateSubscription();
    }

    /** Продолжает переход из текущего положения, в том числе при быстром обратном клике. */
    setOpen(open: boolean) {
        const target = open ? 1 : 0;

        if (open) this.clearPointer();
        if (this.target !== target) {
            this.target = target;
            this.transitionUpdatedAt =
                this.canvas.ownerDocument.defaultView?.performance.now() || 0;
        }
        if (!this.playing || !this.duration) this.progress = this.target;
        this.paint();
        this.updateSubscription();
    }

    /** Вне экрана и при reduced motion фиксирует конечное состояние без фонового цикла. */
    setPlaying(playing: boolean) {
        this.playing = playing;
        if (!playing) this.clearPointer();
        if (!playing) this.progress = this.target;
        this.syncColor();
        this.paint();
        this.updateSubscription();
    }

    destroy() {
        this.unsubscribe?.();
        this.unsubscribe = undefined;
    }

    private updateSubscription() {
        const needed =
            this.playing &&
            this.rects.length > 0 &&
            (this.target === 0 || this.progress !== this.target);

        if (!needed) {
            this.destroy();
        } else if (!this.unsubscribe) {
            this.unsubscribe = subscribeAnimationFrame(this.tick, this.needsFullRate);
        }
    }

    private needsFullRate = () =>
        this.progress !== this.target || Boolean(this.pointer) || this.pointerSettling;

    private tick = (seconds: number, timestamp: number) => {
        this.elapsed += seconds;
        this.colorSyncElapsed += seconds;
        if (this.colorSyncElapsed >= COLOR_SYNC_INTERVAL) {
            this.colorSyncElapsed %= COLOR_SYNC_INTERVAL;
            this.syncColor();
        }
        // Первый шаг начинается с нажатия, а не с предыдущего кадра фонового движения.
        const transitionSeconds = Math.min(
            seconds,
            Math.max(0, (timestamp - this.transitionUpdatedAt) / MILLISECONDS_PER_SECOND),
        );
        const step = this.duration ? transitionSeconds / this.duration : 1;

        this.transitionUpdatedAt = timestamp;

        if (this.progress < this.target)
            this.progress = Math.min(this.target, this.progress + step);
        if (this.progress > this.target)
            this.progress = Math.max(this.target, this.progress - step);
        this.paint(seconds);
        this.updateSubscription();
    };

    private paintParticle(particle: Particle, rect: Rect, progress: number, response: number) {
        const { context } = this;
        const { cloudX, cloudY, radius, phase, speed } = particle;
        const offsetX =
            (Math.sin(this.elapsed * speed + phase) - Math.sin(phase)) * particle.wobbleX;
        const offsetY =
            (Math.cos(this.elapsed * speed * PARTICLES.verticalSpeedRatio + phase) -
                Math.cos(phase)) *
            particle.wobbleY;
        const baseX = rect.x + cloudX + offsetX;
        const baseY = rect.y + cloudY + offsetY;
        const delay = (particle.opacityPhase / FULL_CIRCLE) * DISSOLVE.stagger;
        const localProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - DISSOLVE.stagger)));
        // Сглаживаем индивидуальный переход после задержки: влёт и вылет идут по одной траектории.
        const dissolve = localProgress * localProgress * (3 - 2 * localProgress);
        const opacityProgress =
            (Math.sin(this.elapsed * particle.opacitySpeed + particle.opacityPhase) + 1) / 2;
        // Яркость и размер растут вместе: мягкое мерцание без размытия и дополнительных слоёв.
        const radiusScale =
            PARTICLES.twinkleRadiusMin + opacityProgress * (1 - PARTICLES.twinkleRadiusMin);
        const currentRadius =
            radius * radiusScale * (1 - dissolve * (1 - DISSOLVE.finalRadiusScale));
        const scatter =
            DISSOLVE.scatter.min +
            ((speed - PARTICLES.speed.min) / PARTICLES.speed.range) * DISSOLVE.scatter.range;
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const deltaX = centerX - baseX;
        const deltaY = centerY - baseY;
        const distance = Math.hypot(deltaX, deltaY);
        const contraction = distance ? Math.min(scatter / distance, 1) : 0;
        const minX = rect.x - this.edgeSpread + radius;
        const maxX = rect.x + rect.width + this.edgeSpread - radius;
        const minY = rect.y + radius;
        const maxY = rect.y + rect.height - radius;
        const startX = clamp(baseX, minX, maxX);
        const startY = clamp(baseY, minY, maxY);
        // При раскрытии собираем облако к центру, при скрытии идём обратно; центр не пересекаем.
        const endX = clamp(baseX + deltaX * contraction, minX, maxX);
        const endY = clamp(baseY + deltaY * contraction, minY, maxY);
        const settling = updatePointerOffset(particle, this.pointer, startX, startY, response);

        this.pointerSettling ||= settling;

        context.globalAlpha =
            particle.opacity *
            (PARTICLES.opacity.multiplierMin +
                opacityProgress *
                    (PARTICLES.opacity.multiplierMax - PARTICLES.opacity.multiplierMin)) *
            (1 - dissolve);
        this.point.x = displaceWithinBounds(
            startX + (endX - startX) * dissolve,
            particle.pointerX * (1 - dissolve),
            minX,
            maxX,
        );
        this.point.y = displaceWithinBounds(
            startY + (endY - startY) * dissolve,
            particle.pointerY * (1 - dissolve),
            minY,
            maxY,
        );
        if (this.elementShape) constrainToShape(this.elementShape, this.point, rect, particle);
        context.beginPath();
        context.arc(this.point.x, this.point.y, currentRadius, 0, FULL_CIRCLE);
        context.fill();
    }

    private paint(seconds = 0) {
        const { context } = this;
        const response = this.playing ? 1 - Math.exp(-POINTER.response * seconds) : 1;

        this.pointerSettling = false;

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.color || !this.mask || this.progress === 1) return;
        context.setTransform(
            this.scaleX,
            0,
            0,
            this.scaleY,
            -this.left * this.scaleX,
            -this.top * this.scaleY,
        );
        context.save();
        context.clip(this.mask);
        context.fillStyle = this.color;

        this.rects.forEach((rect, index) => {
            this.particles[index].forEach((particle) =>
                this.paintParticle(particle, rect, this.progress, response),
            );
        });
        context.restore();
    }
}
