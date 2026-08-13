/* eslint-disable max-lines */

/**
 * Частицы мутируются на месте: за кадр пересчитываются сотни объектов,
 * и создание новых заметно дороже присваивания полей.
 */
/* eslint-disable no-param-reassign */
import { easingCss } from './easing';
import {
    ASSEMBLE_DURATION,
    CANVAS_PADDING,
    clamp,
    createParticles,
    interpolate,
    MAX_DEVICE_PIXEL_RATIO,
    type Particle,
    type Point,
    SCATTER_DURATION,
} from './particle-utils';

export type ParticleEngineOptions = {
    color?: string;
    particleCount?: number;
    prefersReducedMotion?: boolean;
    documentVisible?: boolean;
};

export type ParticleEngineEnvironment = {
    prefersReducedMotion: boolean;
    documentVisible: boolean;
};

type AnimationMode = 'hidden' | 'scatter' | 'idle' | 'assemble' | 'static';

const DEFAULT_PARTICLE_COLOR = '#000000';
const MIN_OPACITY_MULTIPLIER = 0.38;
const ASSEMBLE_FADE_OFFSET = 0.55;
const AMBIENT_CLOCK_DURATION = 1000;

const noop = (): void => undefined;

const getClockProgress = (clock?: Animation) => clock?.effect?.getComputedTiming().progress ?? 0;

const getClockTime = (clock?: Animation) =>
    typeof clock?.currentTime === 'number' ? clock.currentTime : 0;

const playClock = (clock?: Animation) => {
    if (clock?.playState === 'paused') {
        clock.play();
    }
};

const pauseClock = (clock?: Animation) => {
    if (clock?.playState === 'running') {
        clock.pause();
    }
};

const cancelClock = (clock?: Animation) => {
    if (!clock) {
        return;
    }

    clock.finished.catch(noop);
    clock.cancel();
};

const preserveParticleState = (nextParticles: Particle[], previousParticles: Particle[]) =>
    nextParticles.map((particle, index) => {
        const previous = previousParticles[index];

        return {
            ...particle,
            cloudX: previous.cloudX,
            cloudY: previous.cloudY,
            fromX: previous.fromX,
            fromY: previous.fromY,
            x: previous.x,
            y: previous.y,
            radius: previous.radius,
            opacity: previous.opacity,
            opacityPhase: previous.opacityPhase,
            opacitySpeed: previous.opacitySpeed,
            phase: previous.phase,
            speed: previous.speed,
            wobbleX: previous.wobbleX,
            wobbleY: previous.wobbleY,
        };
    });

export class TextShimmerParticleEngine {
    private context: CanvasRenderingContext2D | null;

    private options: ParticleEngineOptions;

    private particles: Particle[] = [];

    private mode: AnimationMode = 'hidden';

    private transitionClock?: Animation;

    private ambientClock?: Animation;

    private assemblyOpacityClock?: Animation;

    private idleClockOffset = 0;

    private frameId?: number;

    private color = DEFAULT_PARTICLE_COLOR;

    private width = 1;

    private drawingWidth = 1;

    private drawingHeight = 1;

    private destroyed = false;

    private prefersReducedMotion: boolean;

    private documentVisible: boolean;

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly textElement: HTMLElement,
        options: ParticleEngineOptions = {},
    ) {
        this.context = canvas.getContext('2d');
        this.options = options;
        this.prefersReducedMotion = Boolean(options.prefersReducedMotion);
        this.documentVisible = options.documentVisible !== false;
        this.refresh();
    }

    public refresh(options?: ParticleEngineOptions) {
        if (this.destroyed) {
            return;
        }

        if (options) {
            this.options = { ...this.options, ...options };
        }

        const previousWidth = this.width;
        const previousParticles = this.particles;
        const rect = this.textElement.getBoundingClientRect();
        const width = Math.max(1, Math.ceil(rect.width || this.textElement.offsetWidth));
        const height = Math.max(1, Math.ceil(rect.height || this.textElement.offsetHeight));
        const canPreserveParticles =
            this.mode !== 'hidden' && previousParticles.length > 0 && previousWidth > 0;
        const canvasResized = this.resizeCanvas(width, height, canPreserveParticles);
        const textStyle = window.getComputedStyle(this.textElement);
        const nextParticles = createParticles(
            this.textElement,
            textStyle,
            width,
            height,
            canPreserveParticles ? previousParticles.length : this.options.particleCount,
        );
        const particlesPreserved =
            canPreserveParticles && previousParticles.length === nextParticles.length;

        this.particles = particlesPreserved
            ? preserveParticleState(nextParticles, previousParticles)
            : nextParticles;

        if (particlesPreserved && this.mode === 'assemble') {
            this.preserveAssemblyPosition();
        }

        this.renderAfterRefresh(particlesPreserved, canvasResized);
    }

    public setEnvironment(environment: ParticleEngineEnvironment) {
        if (this.destroyed) {
            return;
        }

        const reducedMotionChanged = environment.prefersReducedMotion !== this.prefersReducedMotion;
        const visibilityChanged = environment.documentVisible !== this.documentVisible;

        this.prefersReducedMotion = environment.prefersReducedMotion;
        this.documentVisible = environment.documentVisible;

        if (reducedMotionChanged) {
            this.applyReducedMotionPreference();
        }

        if (reducedMotionChanged || visibilityChanged) {
            this.syncClockPlayback();

            if (this.documentVisible) {
                this.requestFrame();
            } else {
                this.cancelFrame();
            }
        }
    }

    public scatter() {
        if (this.destroyed || this.particles.length === 0) {
            this.clear();

            return false;
        }

        this.cancelTransitionClocks();
        this.cancelAmbientClock();
        this.setParticleOrigins(this.getParticlePositions(), 'target');

        if (this.prefersReducedMotion) {
            this.showStaticCloud();

            return true;
        }

        this.mode = 'scatter';
        this.ambientClock = this.createClock({
            duration: AMBIENT_CLOCK_DURATION,
            iterations: Infinity,
            easing: 'linear',
        });
        const clock = this.createClock({
            duration: SCATTER_DURATION,
            easing: easingCss.easeOutCubic,
        });

        if (!clock || !this.ambientClock) {
            cancelClock(clock);
            this.showStaticCloud();

            return true;
        }

        this.transitionClock = clock;
        clock.finished.then(() => this.completeScatter(clock), noop);
        this.drawParticles(1, getClockTime(this.ambientClock));
        this.requestFrame();

        return true;
    }

    public assemble(): Promise<boolean> {
        if (this.destroyed) {
            return Promise.resolve(false);
        }

        this.cancelTransitionClocks();
        this.setParticleOrigins(this.getParticlePositions(), 'cloud');

        if (this.prefersReducedMotion || this.particles.length === 0) {
            this.completeAssemblyImmediately();

            return Promise.resolve(true);
        }

        this.mode = 'assemble';

        const clock = this.createClock({
            duration: ASSEMBLE_DURATION,
            easing: easingCss.easeInOutCubic,
        });
        const opacityClock = this.createClock({
            delay: ASSEMBLE_DURATION * ASSEMBLE_FADE_OFFSET,
            duration: ASSEMBLE_DURATION * (1 - ASSEMBLE_FADE_OFFSET),
            easing: 'linear',
        });

        if (!clock || !opacityClock) {
            cancelClock(clock);
            cancelClock(opacityClock);
            this.completeAssemblyImmediately();

            return Promise.resolve(true);
        }

        this.transitionClock = clock;
        this.assemblyOpacityClock = opacityClock;
        this.requestFrame();

        return clock.finished.then(
            () => this.completeAssembly(clock),
            () => false,
        );
    }

    public clear() {
        this.mode = 'hidden';
        this.cancelFrame();
        this.cancelTransitionClocks();
        this.cancelAmbientClock();
        this.clearCanvas();
    }

    public destroy() {
        if (this.destroyed) {
            return;
        }

        this.destroyed = true;
        this.clear();
    }

    private resizeCanvas(width: number, height: number, preserveDrawingArea: boolean) {
        this.width = width;
        this.drawingWidth = preserveDrawingArea ? Math.max(this.drawingWidth, width) : width;
        this.drawingHeight = preserveDrawingArea ? Math.max(this.drawingHeight, height) : height;

        const canvasWidth = this.drawingWidth + CANVAS_PADDING * 2;
        const canvasHeight = this.drawingHeight + CANVAS_PADDING * 2;
        const pixelRatio = clamp(window.devicePixelRatio || 1, 1, MAX_DEVICE_PIXEL_RATIO);
        const bitmapWidth = Math.ceil(canvasWidth * pixelRatio);
        const bitmapHeight = Math.ceil(canvasHeight * pixelRatio);
        const canvasResized =
            this.canvas.width !== bitmapWidth || this.canvas.height !== bitmapHeight;

        this.canvas.style.top = `${-CANVAS_PADDING}px`;
        this.canvas.style.left = `${-CANVAS_PADDING}px`;
        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${canvasHeight}px`;

        if (this.options.color) {
            this.canvas.style.color = this.options.color;
        } else {
            this.canvas.style.removeProperty('color');
        }

        if (this.canvas.width !== bitmapWidth) {
            this.canvas.width = bitmapWidth;
        }

        if (this.canvas.height !== bitmapHeight) {
            this.canvas.height = bitmapHeight;
        }

        this.context = this.canvas.getContext('2d');
        this.context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        this.color = window.getComputedStyle(this.canvas).color || DEFAULT_PARTICLE_COLOR;

        return canvasResized;
    }

    private renderAfterRefresh(particlesPreserved: boolean, canvasResized: boolean) {
        if (this.mode === 'hidden') {
            this.clearCanvas();
        } else if (this.mode === 'static') {
            if (!particlesPreserved) {
                this.placeParticlesInCloud();
            }

            this.drawParticles();
        } else {
            if (!particlesPreserved && this.mode === 'idle') {
                this.placeParticlesInCloud();
            }

            if (canvasResized && particlesPreserved) {
                const opacityMultiplier = this.mode === 'assemble' ? this.getAssemblyOpacity() : 1;

                this.drawParticles(opacityMultiplier, getClockTime(this.ambientClock));
            }

            this.requestFrame();
        }
    }

    private setParticleOrigins(previousPositions: Point[], fallback: 'target' | 'cloud') {
        this.particles.forEach((particle, index) => {
            const previous = previousPositions.length
                ? previousPositions[index % previousPositions.length]
                : undefined;
            const fallbackX = fallback === 'target' ? particle.targetX : particle.cloudX;
            const fallbackY = fallback === 'target' ? particle.targetY : particle.cloudY;

            if (previous) {
                const { x, y } = previous;

                particle.fromX = x;
                particle.fromY = y;
            } else {
                particle.fromX = fallbackX;
                particle.fromY = fallbackY;
            }

            particle.x = particle.fromX;
            particle.y = particle.fromY;
        });
    }

    private getParticlePositions() {
        return this.particles.map(({ x, y }) => ({ x, y }));
    }

    private preserveAssemblyPosition() {
        const progress = getClockProgress(this.transitionClock);

        if (progress >= 1) {
            return;
        }

        const remainingProgress = 1 - progress;

        this.particles.forEach((particle) => {
            particle.fromX = (particle.x - particle.targetX * progress) / remainingProgress;
            particle.fromY = (particle.y - particle.targetY * progress) / remainingProgress;
        });
    }

    private placeParticlesInCloud() {
        this.particles.forEach((particle) => {
            particle.x = particle.cloudX;
            particle.y = particle.cloudY;
        });
    }

    private showStaticCloud() {
        this.cancelTransitionClocks();
        pauseClock(this.ambientClock);
        this.mode = 'static';
        this.placeParticlesInCloud();
        this.drawParticles();
    }

    private completeScatter(clock: Animation) {
        if (this.destroyed || this.transitionClock !== clock || this.mode !== 'scatter') {
            return;
        }

        this.transitionClock = undefined;
        cancelClock(clock);
        this.placeParticlesInCloud();
        this.mode = 'idle';
        this.idleClockOffset = getClockTime(this.ambientClock);
        this.drawParticles(1, this.idleClockOffset);
        this.requestFrame();
    }

    private completeAssembly(clock: Animation) {
        if (this.destroyed || this.transitionClock !== clock || this.mode !== 'assemble') {
            return false;
        }

        this.particles.forEach((particle) => {
            particle.x = particle.targetX;
            particle.y = particle.targetY;
        });
        this.cancelTransitionClocks();
        this.completeAssemblyState();

        return true;
    }

    private completeAssemblyImmediately() {
        this.particles.forEach((particle) => {
            particle.x = particle.targetX;
            particle.y = particle.targetY;
        });
        this.completeAssemblyState();
    }

    private completeAssemblyState() {
        this.cancelFrame();
        this.cancelTransitionClocks();
        this.cancelAmbientClock();
        this.clearCanvas();
        this.mode = 'hidden';
        this.refresh();
    }

    private applyReducedMotionPreference() {
        if (this.prefersReducedMotion && this.mode === 'assemble') {
            this.assemblyOpacityClock?.finish();
            this.transitionClock?.finish();

            return;
        }

        if (this.prefersReducedMotion && this.mode !== 'hidden') {
            this.cancelFrame();
            this.showStaticCloud();

            return;
        }

        if (!this.prefersReducedMotion && this.mode === 'static') {
            const clock =
                this.ambientClock ||
                this.createClock({
                    duration: AMBIENT_CLOCK_DURATION,
                    iterations: Infinity,
                    easing: 'linear',
                });

            if (!clock) {
                return;
            }

            this.ambientClock = clock;
            this.mode = 'idle';
            this.idleClockOffset = getClockTime(clock);
        }
    }

    private render() {
        let opacityMultiplier = 1;

        if (this.mode === 'scatter') {
            const progress = getClockProgress(this.transitionClock);

            this.particles.forEach((particle) => {
                particle.x = interpolate(particle.fromX, particle.cloudX, progress);
                particle.y = interpolate(particle.fromY, particle.cloudY, progress);
            });
        } else if (this.mode === 'idle') {
            const time = Math.max(0, getClockTime(this.ambientClock) - this.idleClockOffset) / 1000;

            this.particles.forEach((particle) => {
                particle.x =
                    particle.cloudX +
                    (Math.sin(time * particle.speed + particle.phase) - Math.sin(particle.phase)) *
                        particle.wobbleX;
                particle.y =
                    particle.cloudY +
                    (Math.cos(time * particle.speed * 0.83 + particle.phase) -
                        Math.cos(particle.phase)) *
                        particle.wobbleY;
            });
        } else if (this.mode === 'assemble') {
            const progress = getClockProgress(this.transitionClock);

            this.particles.forEach((particle) => {
                particle.x = interpolate(particle.fromX, particle.targetX, progress);
                particle.y = interpolate(particle.fromY, particle.targetY, progress);
            });
            opacityMultiplier = this.getAssemblyOpacity();
        }

        this.drawParticles(opacityMultiplier, getClockTime(this.ambientClock));
        this.requestFrame();
    }

    private getAssemblyOpacity() {
        return 1 - getClockProgress(this.assemblyOpacityClock);
    }

    private drawParticles(opacityMultiplier = 1, animationTime?: number) {
        const { context } = this;

        if (!context) {
            return;
        }

        this.clearCanvas();
        context.save();
        context.fillStyle = this.color;
        context.shadowColor = this.color;

        this.particles.forEach((particle) => {
            const opacityProgress =
                animationTime === undefined
                    ? 1
                    : (Math.sin(
                          (animationTime / 1000) * particle.opacitySpeed + particle.opacityPhase,
                      ) +
                          1) /
                      2;
            const animatedOpacity =
                MIN_OPACITY_MULTIPLIER + opacityProgress * (1 - MIN_OPACITY_MULTIPLIER);

            context.beginPath();
            context.globalAlpha = particle.opacity * animatedOpacity * opacityMultiplier;
            context.shadowBlur = 0.75 + particle.radius * 0.65;
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fill();
        });

        context.restore();
    }

    private createClock(timing: KeyframeEffectOptions) {
        if (
            typeof Animation !== 'function' ||
            typeof KeyframeEffect !== 'function' ||
            !document.timeline
        ) {
            return undefined;
        }

        try {
            const effect = new KeyframeEffect(null, null, { ...timing, fill: 'both' });
            const clock = new Animation(effect, document.timeline);

            clock.play();

            if (!this.documentVisible) {
                clock.pause();
            }

            return clock;
        } catch {
            return undefined;
        }
    }

    private syncClockPlayback() {
        const shouldPlay =
            this.documentVisible &&
            !this.prefersReducedMotion &&
            this.mode !== 'hidden' &&
            this.mode !== 'static';
        const clocks = [this.transitionClock, this.ambientClock, this.assemblyOpacityClock];

        clocks.forEach((clock) => {
            if (shouldPlay) {
                playClock(clock);
            } else {
                pauseClock(clock);
            }
        });
    }

    private cancelTransitionClocks() {
        const { transitionClock, assemblyOpacityClock: opacityClock } = this;

        this.transitionClock = undefined;
        this.assemblyOpacityClock = undefined;
        cancelClock(transitionClock);
        cancelClock(opacityClock);
    }

    private cancelAmbientClock() {
        const clock = this.ambientClock;

        this.ambientClock = undefined;
        cancelClock(clock);
    }

    private clearCanvas() {
        this.context?.clearRect(
            0,
            0,
            this.drawingWidth + CANVAS_PADDING * 2,
            this.drawingHeight + CANVAS_PADDING * 2,
        );
    }

    private requestFrame() {
        if (
            this.frameId !== undefined ||
            this.destroyed ||
            this.mode === 'hidden' ||
            this.mode === 'static' ||
            !this.documentVisible
        ) {
            return;
        }

        if (typeof window.requestAnimationFrame === 'function') {
            this.frameId = window.requestAnimationFrame(this.handleFrame);
        } else {
            this.frameId = window.setTimeout(this.handleFrame, 16);
        }
    }

    private cancelFrame() {
        if (this.frameId === undefined) {
            return;
        }

        if (typeof window.cancelAnimationFrame === 'function') {
            window.cancelAnimationFrame(this.frameId);
        } else {
            window.clearTimeout(this.frameId);
        }

        this.frameId = undefined;
    }

    private readonly handleFrame = () => {
        this.frameId = undefined;
        this.render();
    };
}
