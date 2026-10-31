import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { calcGeneratorDuration, spring } from 'motion';

import { SpringTransition, type SpringTransitionProps } from './spring-transition';

const animateMock = jest.fn(() => ({
    cancel: jest.fn(),
    pause: jest.fn(),
    play: jest.fn(),
    onfinish: null,
    startTime: null,
}));

const springDuration = calcGeneratorDuration(spring({ keyframes: [0, 100] }));

const getAnimation = (index: number) => {
    const [{ height: keyframes }, { duration }] = (
        animateMock.mock.calls as unknown as Array<[{ height: string[] }, { duration: number }]>
    )[index];

    return { keyframes, duration };
};

const setup = (props: Partial<SpringTransitionProps<HTMLDivElement>> = {}) => {
    const nodeRef = createRef<HTMLDivElement>();
    const renderTransition = (inProp: boolean) => (
        <SpringTransition
            in={inProp}
            nodeRef={nodeRef}
            enter={{ height: 100 }}
            exit={{ height: 0 }}
            {...props}
        >
            <div ref={nodeRef} />
        </SpringTransition>
    );
    const { rerender } = render(renderTransition(false));

    return (inProp: boolean) => rerender(renderTransition(inProp));
};

const runEnter = (props: Partial<SpringTransitionProps<HTMLDivElement>> = {}) => {
    setup(props)(true);

    return getAnimation(0);
};

describe('SpringTransition', () => {
    beforeEach(() => {
        animateMock.mockClear();
        Object.defineProperty(HTMLElement.prototype, 'animate', {
            value: animateMock,
            configurable: true,
            writable: true,
        });
    });

    afterEach(() => {
        delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
    });

    it('starts the spring immediately without delay', () => {
        const { keyframes, duration } = runEnter();

        expect(keyframes[0]).toBe('0px');
        expect(keyframes[1]).not.toBe('0px');
        expect(keyframes[keyframes.length - 1]).toBe('100px');
        expect(duration).toBe(springDuration);
    });

    it('holds the initial value during delay', () => {
        const delay = 200;
        const { keyframes, duration } = runEnter({ spring: { enter: { delay } } });

        expect(keyframes.slice(0, delay / 10 - 5)).toEqual(Array(delay / 10 - 5).fill('0px'));
        expect(keyframes[keyframes.length - 1]).toBe('100px');
        expect(duration).toBe(springDuration + delay);
    });

    it('starts from the current value when interrupted during delay', () => {
        const toggle = setup({ exit: { height: 50 }, spring: { enter: { delay: 200 } } });

        toggle(true);
        toggle(false);

        const { keyframes, duration } = getAnimation(1);

        expect(keyframes[0]).toBe('0px');
        expect(duration).toBe(calcGeneratorDuration(spring({ keyframes: [0, 50] })));
    });
});
