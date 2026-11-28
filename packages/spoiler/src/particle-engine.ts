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
import { type Rect } from './particle-utils';

type Mode = 'text' | 'element';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/** Контур строки со скруглениями; arcTo поддерживается и в iOS 14. */
const createParticleMask = (rect: Rect, borderRadius: number, edgeSpread: number): Path2D => {
    const path = new Path2D();
    const x = rect.x - edgeSpread;
    const { y, height } = rect;
    const width = rect.width + edgeSpread * 2;
    const radius = Math.min(borderRadius, width / 2, height / 2);

    if (!radius) {
        path.rect(x, y, width, height);

        return path;
    }

    path.moveTo(x + radius, y);
    path.arcTo(x + width, y, x + width, y + height, radius);
    path.arcTo(x + width, y + height, x, y + height, radius);
    path.arcTo(x, y + height, x, y, radius);
    path.arcTo(x, y, x + width, y, radius);
    path.closePath();

    return path;
};

/** Рисует облако и прерываемое растворение частиц вне React. */
export class ParticleEngine {
    private rects: Rect[] = [];

    private layoutKey = '';

    private particles: Particle[][] = [];

    private unsubscribe: (() => void) | undefined;

    private elapsed = 0;

    private colorSyncElapsed = 0;

    private scaleX = 1;

    private scaleY = 1;

    private fontSize: number = FONT.base;

    private masks: Path2D[] = [];

    private color = '';

    private borderRadius = 0;

    private left = 0;

    private top = 0;

    private playing = false;

    private pointer: Point | undefined;

    private localPointer: Point = { x: 0, y: 0 };

    private pointerSettling = false;

    private hoverExpansion = 0;

    private expandOnHover = true;

    private repelParticlesOnHover = true;

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
    ) {
        if (mode === 'element') {
            // Прозрачный запас под hover не меняет размеры содержимого и не растёт по кадрам.
            this.canvas.style.width = `calc(100% + ${POINTER.expansion * 2}px)`;
            this.canvas.style.height = `calc(100% + ${POINTER.expansion * 2}px)`;
            this.canvas.style.left = `${-POINTER.expansion}px`;
            this.canvas.style.top = `${-POINTER.expansion}px`;
        }
    }

    /** Получает оформление из хука; чтения DOM в цикле движения нет. */
    configure(
        borderRadius: number,
        fontSize: number = FONT.base,
        durationMs = DEFAULT_TRANSITION_MS,
    ) {
        this.fontSize = fontSize;
        this.borderRadius = this.mode === 'text' ? Math.max(0, borderRadius) : 0;
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

    /** Меняет реакции на мышь независимо, сохраняя узор и плавный возврат частиц. */
    setInteraction(expandOnHover: boolean, repelParticlesOnHover: boolean) {
        this.expandOnHover = expandOnHover;
        this.repelParticlesOnHover = repelParticlesOnHover;
        if (!expandOnHover && !repelParticlesOnHover) this.clearPointer();
    }

    /** Переводит координаты мыши в систему canvas, включая CSS-масштабирование и переносы строк. */
    setPointer(clientX: number, clientY: number) {
        if (
            !this.playing ||
            this.target === 1 ||
            !this.rects.length ||
            (!this.expandOnHover && !this.repelParticlesOnHover)
        )
            return;
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

    layout(rectangles: Rect[]) {
        const rects = rectangles.filter(({ width, height }) => width > 0 && height > 0);
        const dpr = this.canvas.ownerDocument.defaultView?.devicePixelRatio || 1;
        const layoutKey = JSON.stringify([rects, this.fontSize, this.borderRadius, dpr]);

        // Замена текста без изменения геометрии не сбрасывает движение и реакцию на курсор.
        if (layoutKey === this.layoutKey) {
            if (this.syncColor()) this.paint();

            return;
        }
        this.layoutKey = layoutKey;

        this.rects = rects;
        this.clearPointer();
        this.masks = rects.map((rect) =>
            createParticleMask(rect, this.borderRadius, this.edgeSpread),
        );
        if (!rects.length) {
            this.particles = [];
            this.updateSubscription();
            this.paint();

            return;
        }

        this.left = Math.min(...rects.map((rect) => rect.x)) - this.edgeSpread - POINTER.expansion;
        this.top = Math.min(...rects.map((rect) => rect.y)) - POINTER.expansion;
        const width =
            Math.max(...rects.map((rect) => rect.x + rect.width)) +
            this.edgeSpread +
            POINTER.expansion -
            this.left;
        const height =
            Math.max(...rects.map((rect) => rect.y + rect.height)) + POINTER.expansion - this.top;
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

        this.particles = createParticleGroups(rects, this.fontSize, this.edgeSpread, this.mode);
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
        this.progress !== this.target ||
        Boolean(this.pointer) ||
        this.pointerSettling ||
        this.hoverExpansion > 0;

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

    private paintParticle(
        particle: Particle,
        rect: Rect,
        progress: number,
        response: number,
        hoverScaleX: number,
        hoverScaleY: number,
    ) {
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
        // Сглаживаем появление и затухание каждой точки после индивидуальной задержки.
        const dissolve = localProgress * localProgress * (3 - 2 * localProgress);
        const opacityProgress =
            (Math.sin(this.elapsed * particle.opacitySpeed + particle.opacityPhase) + 1) / 2;
        // Яркость и размер растут вместе: мягкое мерцание без размытия и дополнительных слоёв.
        const radiusScale =
            PARTICLES.twinkleRadiusMin + opacityProgress * (1 - PARTICLES.twinkleRadiusMin);
        const currentRadius = radius * radiusScale;
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const minX = rect.x - this.edgeSpread + radius;
        const maxX = rect.x + rect.width + this.edgeSpread - radius;
        const minY = rect.y + radius;
        const maxY = rect.y + rect.height - radius;
        const startX = clamp(baseX, minX, maxX);
        const startY = clamp(baseY, minY, maxY);
        const settling = updatePointerOffset(
            particle,
            this.pointer && this.repelParticlesOnHover ? this.localPointer : undefined,
            startX,
            startY,
            response,
        );

        this.pointerSettling ||= settling;

        context.globalAlpha =
            particle.opacity *
            (PARTICLES.opacity.multiplierMin +
                opacityProgress *
                    (PARTICLES.opacity.multiplierMax - PARTICLES.opacity.multiplierMin)) *
            (1 - dissolve);
        const x = displaceWithinBounds(startX, particle.pointerX * (1 - dissolve), minX, maxX);
        const y = displaceWithinBounds(startY, particle.pointerY * (1 - dissolve), minY, maxY);

        context.beginPath();
        context.arc(
            centerX + (x - centerX) * hoverScaleX,
            centerY + (y - centerY) * hoverScaleY,
            currentRadius,
            0,
            FULL_CIRCLE,
        );
        context.fill();
    }

    private paint(seconds = 0) {
        const { context } = this;
        const response = this.playing ? 1 - Math.exp(-seconds / POINTER.responseSeconds) : 1;
        const targetExpansion = this.pointer && this.expandOnHover ? POINTER.expansion : 0;

        this.hoverExpansion += (targetExpansion - this.hoverExpansion) * response;
        if (Math.abs(targetExpansion - this.hoverExpansion) < POINTER.precision && response > 0)
            this.hoverExpansion = targetExpansion;

        // Мягкий разгон и торможение оболочки, без изменения отклика отдельных частиц.
        const hoverProgress = this.hoverExpansion / POINTER.expansion;
        const expansion =
            POINTER.expansion * hoverProgress * hoverProgress * (3 - 2 * hoverProgress);

        this.pointerSettling = false;

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.color || !this.masks.length || this.progress === 1) return;
        context.fillStyle = this.color;

        this.rects.forEach((rect, index) => {
            const hoverScaleX = 1 + (2 * expansion) / (rect.width + 2 * this.edgeSpread);
            const hoverScaleY = 1 + (2 * expansion) / rect.height;
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;

            if (this.pointer && this.repelParticlesOnHover) {
                this.localPointer.x = centerX + (this.pointer.x - centerX) / hoverScaleX;
                this.localPointer.y = centerY + (this.pointer.y - centerY) / hoverScaleY;
            }
            context.save();
            // Маску растягиваем вокруг центра каждой строки, но сами круги не масштабируем.
            context.setTransform(
                this.scaleX * hoverScaleX,
                0,
                0,
                this.scaleY * hoverScaleY,
                (centerX * (1 - hoverScaleX) - this.left) * this.scaleX,
                (centerY * (1 - hoverScaleY) - this.top) * this.scaleY,
            );
            context.clip(this.masks[index]);
            context.setTransform(
                this.scaleX,
                0,
                0,
                this.scaleY,
                -this.left * this.scaleX,
                -this.top * this.scaleY,
            );
            this.particles[index].forEach((particle) =>
                this.paintParticle(
                    particle,
                    rect,
                    this.progress,
                    response,
                    hoverScaleX,
                    hoverScaleY,
                ),
            );
            context.restore();
        });
    }
}
