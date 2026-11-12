import { millisecondsToSeconds } from 'motion';
import { animate } from 'motion/mini';

import { tween, type TweenTarget, type TweenTransition, type TweenTransitions } from './tween';

type LogEntry = unknown[];

interface MockAnimation {
    playState: AnimationPlayState;
    playbackRate: number;
    currentTime: number;
    startTime: number | null;
    onfinish: (() => void) | null;
    commitStyles: () => void;
    cancel: () => void;
    finish: () => void;
    pause: () => void;
    play: () => void;
}

const logs = new Map<Element, LogEntry[]>();
const created = new Map<Element, MockAnimation[]>();

const getLog = (element: Element) => logs.get(element) ?? [];

const getAnimations = (element: Element) => created.get(element) ?? [];

function animateMock(this: HTMLElement, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
    const log = getLog(this);
    const animations = getAnimations(this);
    const id = animations.length;
    const animation: MockAnimation = {
        playState: 'running',
        playbackRate: 1,
        currentTime: 0,
        startTime: null,
        onfinish: null,
        commitStyles: () => log.push(['commitStyles', id]),
        cancel: () => {
            animation.playState = 'idle';
            log.push(['cancel', id]);
        },
        finish: () => undefined,
        pause: () => undefined,
        play: () => undefined,
    };

    log.push(['animate', id, keyframes, options]);
    animations.push(animation);
    logs.set(this, log);
    created.set(this, animations);

    return animation;
}

const finish = (element: Element, id: number) => {
    const animation = getAnimations(element)[id];

    animation.playState = 'finished';
    animation.onfinish?.();
};

const finishAll = (element: Element) => {
    getAnimations(element).forEach((_, id) => finish(element, id));
};

const toMotionTransition = (transitions: TweenTransitions) =>
    Object.fromEntries(
        (Object.entries(transitions) as Array<[string, TweenTransition]>).map(
            ([name, { duration, delay, ease }]) => [
                name,
                {
                    ...(duration === undefined
                        ? {}
                        : { duration: millisecondsToSeconds(duration) }),
                    ...(delay === undefined ? {} : { delay: millisecondsToSeconds(delay) }),
                    ...(ease === undefined ? {} : { ease }),
                },
            ],
        ),
    );

const createElement = (attached: boolean) => {
    const element = document.createElement('div');

    element.style.height = '20px';
    element.style.opacity = '0.3';
    element.style.filter = 'blur(1px)';

    if (attached) {
        document.body.appendChild(element);
    }

    return element;
};

const setup = (attached = true) => {
    const ours = createElement(attached);
    const reference = createElement(attached);

    const run = (target: TweenTarget, transitions: TweenTransitions = {}) => ({
        ours: tween(ours, target, transitions),
        reference: animate(reference, target, toMotionTransition(transitions)),
    });

    const expectSameLog = () => expect(getLog(ours)).toEqual(getLog(reference));

    return { ours, reference, run, expectSameLog };
};

const track = (promise: Promise<unknown>) => {
    const state = { settled: false };

    promise.then(() => {
        state.settled = true;
    });

    return state;
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('tween', () => {
    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'animate', {
            value: animateMock,
            configurable: true,
            writable: true,
        });
    });

    afterEach(() => {
        delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
        logs.clear();
        created.clear();
        document.body.innerHTML = '';
    });

    it.each<TweenTarget>([
        { height: 100 },
        { height: '50%' },
        { opacity: 0.5 },
        { filter: 'blur(4px)' },
        { height: 0, opacity: 1, filter: 'blur(0px)' },
    ])('starts the same native animation for %p', (target) => {
        const { run, expectSameLog } = setup();

        run(target);

        expectSameLog();
    });

    it('applies duration, delay and cubic bezier ease per value', () => {
        const { run, expectSameLog } = setup();

        run(
            { height: 100, opacity: 0, filter: 'blur(4px)' },
            {
                height: { duration: 500, delay: 100, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 200 },
                filter: { delay: 50 },
            },
        );

        expectSameLog();
    });

    it('writes the final keyframe to the inline style when finished', () => {
        const { ours, reference, run, expectSameLog } = setup();

        run({ height: 100, opacity: 0.5, filter: 'blur(4px)' });
        finishAll(ours);
        finishAll(reference);

        expectSameLog();
        expect(ours.style.cssText).toEqual(reference.style.cssText);
    });

    it('resolves finished only after every value has finished', async () => {
        const { ours, reference, run } = setup();
        const controls = run({ height: 100, opacity: 0.5 });
        const oursState = track(controls.ours.finished);
        const referenceState = track(controls.reference.finished);

        finish(ours, 0);
        finish(reference, 0);
        await flush();

        expect(oursState).toEqual(referenceState);

        finish(ours, 1);
        finish(reference, 1);
        await flush();

        expect(oursState).toEqual(referenceState);
    });

    it('interrupts a running value when it is animated again', () => {
        const { run, expectSameLog } = setup();

        run({ height: 100, opacity: 0.5 });
        run({ height: 0 }, { height: { duration: 200 } });

        expectSameLog();
    });

    it('stops only values that are still owned by the controls', () => {
        const { run, expectSameLog } = setup();
        const first = run({ height: 100, opacity: 0.5 });

        run({ height: 0 });
        first.ours.stop();
        first.reference.stop();

        expectSameLog();
    });

    it('commits and cancels running animations on stop', () => {
        const { run, expectSameLog } = setup();
        const controls = run({ height: 100, opacity: 0.5, filter: 'blur(4px)' });

        controls.ours.stop();
        controls.reference.stop();

        expectSameLog();
    });

    it('ignores stop after the animations have finished', () => {
        const { ours, reference, run, expectSameLog } = setup();
        const controls = run({ height: 100, opacity: 0.5 });

        finishAll(ours);
        finishAll(reference);
        controls.ours.stop();
        controls.reference.stop();

        expectSameLog();
    });

    it('does not commit styles of a detached element', () => {
        const { run, expectSameLog } = setup(false);
        const controls = run({ height: 100, opacity: 0.5 });

        run({ height: 0 });
        controls.ours.stop();
        controls.reference.stop();

        expectSameLog();
    });
});
