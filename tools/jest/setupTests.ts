/* eslint-disable */
/*
 * jest-dom adds custom jest matchers for asserting on DOM nodes.
 * allows you to do things like:
 * expect(element).toHaveTextContent(/react/i)
 * learn more: https://github.com/testing-library/jest-dom
 */
import '@testing-library/jest-dom';

import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id' });

// jsdom не реализует Web Animations API, которую использует motion/mini
if (typeof Element !== 'undefined' && !Element.prototype.animate) {
    Element.prototype.animate = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const animation: any = {
            cancel: () => {},
            pause: () => {},
            play: () => {},
            finish: () => {
                animation.onfinish?.();
            },
            reverse: () => {},
            updatePlaybackRate: () => {},
            persist: () => {},
            commitStyles: () => {},
            finished: Promise.resolve(),
            ready: Promise.resolve(),
            playbackRate: 1,
            currentTime: 0,
            startTime: null,
            playState: 'finished' as AnimationPlayState,
            replaceState: 'active' as AnimationReplaceState,
            pending: false,
            id: '',
            timeline: null,
            effect: null,
            onfinish: null as (() => void) | null,
            oncancel: null,
            onremove: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        };
        // motion-dom использует animation.onfinish для оповещения о завершении
        Promise.resolve().then(() => {
            animation.onfinish?.();
        });
        return animation as unknown as Animation;
    };
}
