import {
    buildTransform as motionBuildTransform,
    transformProps as motionTransformProps,
} from 'motion';

import { buildTransform, transformProps } from './transform';

const transformKeys = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
    'pathRotation',
];

const expectSame = (latest: Record<string, number>) =>
    expect(buildTransform(latest)).toBe(motionBuildTransform(latest, {}));

describe('transformProps', () => {
    it.each([
        ...transformKeys,
        'height',
        'width',
        'opacity',
        'perspective',
        'originX',
        'scaleZ',
        'translate',
        'transform',
    ])('%s matches motion', (name) => {
        expect(transformProps.has(name)).toBe(motionTransformProps.has(name));
    });
});

describe('buildTransform', () => {
    it.each(transformKeys)('%s: unit and name match motion', (key) => {
        expectSame({ [key]: 12.5 });
        expectSame({ [key]: -0.25 });
    });

    it.each(transformKeys)('%s: default value matches motion', (key) => {
        expectSame({ [key]: 0 });
        expectSame({ [key]: -0 });
        expectSame({ [key]: 1 });
    });

    it('empty values', () => {
        expectSame({});
        expect(buildTransform({})).toBe('none');
    });

    it('order does not depend on key order', () => {
        expectSame({ rotate: 45, scale: 0.5, y: -10.75, x: 20, height: 300 });
        expectSame({
            skewY: 3,
            rotateZ: 90,
            scaleY: 2,
            translateZ: 1,
            z: 5,
            transformPerspective: 800,
        });
        expectSame(
            Object.fromEntries([...transformKeys].reverse().map((key, index) => [key, index + 2])),
        );
    });

    it('rotate together with pathRotation', () => {
        expectSame({ rotate: 30, pathRotation: 15 });
        expectSame({ rotate: 0, pathRotation: 15, y: 4 });
    });

    it('transform together with other properties', () => {
        expectSame({ y: -24, height: 0 });
        expectSame({ y: -0.4712345678901, height: 120.5 });
        expectSame({ y: 0, height: 300 });
    });
});
