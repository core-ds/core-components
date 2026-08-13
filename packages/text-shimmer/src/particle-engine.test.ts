/* eslint-disable max-lines */
import 'jest-canvas-mock';

import { easingCss } from './easing';
import { TextShimmerParticleEngine } from './particle-engine';
import { type Particle } from './particle-utils';

type EngineInternals = {
    mode: 'hidden' | 'scatter' | 'idle' | 'assemble' | 'static';
    particles: Particle[];
    render: () => void;
};

class MockKeyframeEffect {
    public progress = 0;

    public timing: KeyframeEffectOptions;

    constructor(
        _target: Element | null,
        _keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options: number | KeyframeEffectOptions = {},
    ) {
        this.timing = typeof options === 'number' ? { duration: options } : { ...options };
    }

    public getComputedTiming() {
        return { progress: this.progress } as ComputedEffectTiming;
    }
}

class MockAnimation {
    public static instances: MockAnimation[] = [];

    public currentTime: CSSNumberish | null = 0;

    public playbackRate = 1;

    public playState: AnimationPlayState = 'idle';

    public readonly finished: Promise<MockAnimation>;

    private resolveFinished: (animation: MockAnimation) => void = () => undefined;

    private rejectFinished: (reason: DOMException) => void = () => undefined;

    constructor(public readonly effect: MockKeyframeEffect) {
        this.finished = new Promise((resolve, reject) => {
            this.resolveFinished = resolve;
            this.rejectFinished = reject;
        });
        MockAnimation.instances.push(this);
    }

    public play() {
        this.playState = 'running';
    }

    public pause() {
        this.playState = 'paused';
    }

    public finish() {
        const delay = Number(this.effect.timing.delay || 0);
        const duration = Number(this.effect.timing.duration || 0);

        this.currentTime = delay + duration;
        this.effect.progress = 1;
        this.playState = 'finished';
        this.resolveFinished(this);
    }

    public cancel() {
        this.playState = 'idle';
        this.rejectFinished(new DOMException('The animation was cancelled', 'AbortError'));
    }

    public setProgress(progress: number) {
        const delay = Number(this.effect.timing.delay || 0);
        const duration = Number(this.effect.timing.duration || 0);

        this.effect.progress = progress;
        this.currentTime = delay + duration * progress;
    }
}

const getInternals = (engine: TextShimmerParticleEngine) => engine as unknown as EngineInternals;

const getParticles = (engine: TextShimmerParticleEngine) =>
    getInternals(engine).particles.map((particle) => ({
        ...particle,
    }));

const getLatestClock = (predicate: (clock: MockAnimation) => boolean) =>
    [...MockAnimation.instances].reverse().find(predicate);

const getTransitionClock = (easing: string) => {
    const clock = getLatestClock((animation) => animation.effect.timing.easing === easing);

    if (!clock) {
        throw new Error(`Animation clock with easing ${easing} was not created`);
    }

    return clock;
};

const flushPromises = () => Promise.resolve();

describe('TextShimmerParticleEngine', () => {
    const NativeAnimation = global.Animation;
    const NativeKeyframeEffect = global.KeyframeEffect;
    const timelineDescriptor = Object.getOwnPropertyDescriptor(document, 'timeline');

    beforeAll(() => {
        global.Animation = MockAnimation as unknown as typeof Animation;
        global.KeyframeEffect = MockKeyframeEffect as unknown as typeof KeyframeEffect;
        Object.defineProperty(document, 'timeline', {
            configurable: true,
            value: {},
        });
    });

    afterAll(() => {
        global.Animation = NativeAnimation;
        global.KeyframeEffect = NativeKeyframeEffect;

        if (timelineDescriptor) {
            Object.defineProperty(document, 'timeline', timelineDescriptor);
        } else {
            Reflect.deleteProperty(document, 'timeline');
        }
    });

    beforeEach(() => {
        MockAnimation.instances = [];
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('keeps the visible particle cloud stable when the future text changes', () => {
        const canvas = document.createElement('canvas');
        const textElement = document.createElement('span');
        let width = 240;

        textElement.textContent = 'Старый текст';
        jest.spyOn(textElement, 'getBoundingClientRect').mockImplementation(
            () =>
                ({
                    width,
                    height: 56,
                }) as DOMRect,
        );

        const engine = new TextShimmerParticleEngine(canvas, textElement);

        engine.scatter();

        const particlesBeforeUpdate = getParticles(engine);

        textElement.textContent = 'Новый текст';
        width = 320;
        engine.refresh();

        const particlesAfterUpdate = getParticles(engine);

        expect(particlesAfterUpdate).toHaveLength(particlesBeforeUpdate.length);

        particlesAfterUpdate.forEach((particle, index) => {
            const previousParticle = particlesBeforeUpdate[index];

            expect(particle.cloudX).toBe(previousParticle.cloudX);
            expect(particle.cloudY).toBe(previousParticle.cloudY);
            expect(particle.x).toBe(previousParticle.x);
            expect(particle.y).toBe(previousParticle.y);
            expect(particle.radius).toBe(previousParticle.radius);
            expect(particle.opacityPhase).toBe(previousParticle.opacityPhase);
        });

        expect(
            particlesAfterUpdate.some(
                (particle, index) =>
                    particle.targetX !== particlesBeforeUpdate[index].targetX ||
                    particle.targetY !== particlesBeforeUpdate[index].targetY,
            ),
        ).toBe(true);

        engine.destroy();
    });

    it('draws the first scatter frame synchronously before hiding the source text', () => {
        const canvas = document.createElement('canvas');
        const textElement = document.createElement('span');
        const fill = jest.spyOn(CanvasRenderingContext2D.prototype, 'fill');

        textElement.textContent = 'Текст';

        const engine = new TextShimmerParticleEngine(canvas, textElement);

        fill.mockClear();
        engine.scatter();

        expect(fill).toHaveBeenCalled();

        engine.destroy();
    });

    it('keeps particle positions continuous when the target changes during assembly', async () => {
        const canvas = document.createElement('canvas');
        const textElement = document.createElement('span');
        let width = 240;

        textElement.textContent = 'Старый текст';
        jest.spyOn(textElement, 'getBoundingClientRect').mockImplementation(
            () =>
                ({
                    width,
                    height: 56,
                }) as DOMRect,
        );

        const engine = new TextShimmerParticleEngine(canvas, textElement);
        const internals = getInternals(engine);

        engine.scatter();

        const scatterClock = getTransitionClock(easingCss.easeOutCubic);

        scatterClock.setProgress(1);
        internals.render();
        scatterClock.finish();
        await flushPromises();

        expect(scatterClock.playState).toBe('idle');

        const assemblyFinished = engine.assemble();
        const assemblyClock = getTransitionClock(easingCss.easeInOutCubic);
        const opacityClock = getLatestClock(
            (animation) => Number(animation.effect.timing.delay) > 0,
        );

        assemblyClock.setProgress(0.5);
        internals.render();

        const particlesBeforeUpdate = getParticles(engine);

        textElement.textContent = 'Совершенно новый текст';
        width = 360;
        engine.refresh();

        const particlesAfterUpdate = getParticles(engine);

        particlesAfterUpdate.forEach((particle, index) => {
            expect(particle.x).toBe(particlesBeforeUpdate[index].x);
            expect(particle.y).toBe(particlesBeforeUpdate[index].y);
        });

        internals.render();

        getParticles(engine).forEach((particle, index) => {
            expect(particle.x).toBeCloseTo(particlesAfterUpdate[index].x, 10);
            expect(particle.y).toBeCloseTo(particlesAfterUpdate[index].y, 10);
        });

        assemblyClock.finish();
        await expect(assemblyFinished).resolves.toBe(true);
        expect(assemblyClock.playState).toBe('idle');
        expect(opacityClock?.playState).toBe('idle');

        engine.destroy();
    });

    it('pauses and resumes WAAPI clocks with document visibility', () => {
        const canvas = document.createElement('canvas');
        const textElement = document.createElement('span');

        textElement.textContent = 'Текст';

        const engine = new TextShimmerParticleEngine(canvas, textElement);

        engine.scatter();

        const transitionClock = getTransitionClock(easingCss.easeOutCubic);
        const ambientClock = getLatestClock((clock) => clock.effect.timing.iterations === Infinity);

        engine.setEnvironment({ prefersReducedMotion: false, documentVisible: false });

        expect(transitionClock.playState).toBe('paused');
        expect(ambientClock?.playState).toBe('paused');

        engine.setEnvironment({ prefersReducedMotion: false, documentVisible: true });

        expect(transitionClock.playState).toBe('running');
        expect(ambientClock?.playState).toBe('running');

        engine.destroy();
    });

    it('does not complete a cancelled assembly after a new scatter starts', async () => {
        const canvas = document.createElement('canvas');
        const textElement = document.createElement('span');

        textElement.textContent = 'Текст';

        const engine = new TextShimmerParticleEngine(canvas, textElement);

        engine.scatter();
        const assemblyFinished = engine.assemble();

        engine.scatter();

        await expect(assemblyFinished).resolves.toBe(false);
        expect(getInternals(engine).mode).toBe('scatter');

        engine.destroy();
    });

    it('finishes an active assembly when reduced motion is enabled', async () => {
        const canvas = document.createElement('canvas');
        const textElement = document.createElement('span');

        textElement.textContent = 'Текст';

        const engine = new TextShimmerParticleEngine(canvas, textElement);

        engine.scatter();

        const assemblyFinished = engine.assemble();

        engine.setEnvironment({ prefersReducedMotion: true, documentVisible: true });

        await expect(assemblyFinished).resolves.toBe(true);
        expect(getInternals(engine).mode).toBe('hidden');

        engine.destroy();
    });

    it('uses a static fallback when WAAPI is unavailable', async () => {
        const canvas = document.createElement('canvas');
        const textElement = document.createElement('span');
        const AnimationConstructor = global.Animation;

        textElement.textContent = 'Текст';
        global.Animation = undefined as unknown as typeof Animation;

        const engine = new TextShimmerParticleEngine(canvas, textElement);

        engine.scatter();

        expect(getInternals(engine).mode).toBe('static');
        await expect(engine.assemble()).resolves.toBe(true);
        expect(getInternals(engine).mode).toBe('hidden');

        engine.destroy();
        global.Animation = AnimationConstructor;
    });
});
