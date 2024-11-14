import { setupScreenshotTesting, createSpriteStorybookUrl } from '../../../screenshot-utils';
import { WEIGHTS_TEXT, ROW_LIMITS, COLORS_INVERTED } from '../types';
import { DEFAULT_TEXT_VIEW } from './component';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

describe(
    'Typography.Text | all variants',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: [
                            'primary-large',
                            'primary-medium',
                            'primary-small',
                            'secondary-large',
                        ],
                        weight: [...WEIGHTS_TEXT],
                    },
                    size: { width: 250, height: 100 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        children: 'Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: [
                            'secondary-medium',
                            'secondary-small',
                            'component-primary',
                            'caps',
                            'component-secondary',
                            'tagline',
                        ],
                        weight: [...WEIGHTS_TEXT],
                    },
                    size: { width: 250, height: 100 },
                }),
            ],
        ],
        viewport: { width: 1100, height: 100 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Typography.Text | colors',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        // TODO отдельно сделать апдейт снепшотов, т.к. в тесте меняется порядок цветов, выглядит как баг, но его нет
                        // color: [...COLORS_MAIN],
                        color: [
                            'disabled',
                            'tertiary',
                            'accent',
                            'primary',
                            'attention',
                            'positive',
                            'secondary',
                            'link',
                            'negative',
                        ],
                        view: DEFAULT_TEXT_VIEW,
                        children: 'Мягкая французская булочка',
                    },
                    size: { width: 260, height: 40 },
                }),
            ],
            [
                'sprite-inverted',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    inverted: true,
                    knobs: {
                        color: [...COLORS_INVERTED],
                        view: DEFAULT_TEXT_VIEW,
                        children: 'Мягкая французская булочка',
                    },
                    size: { width: 260, height: 40 },
                }),
            ],
        ],
        viewport: { width: 600, height: 100 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Typography.Text | rowLimit',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        children:
                            'Съешь ещё этих мягких французских булок, да выпей чаю. Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: [
                            'primary-large',
                            'primary-medium',
                            'primary-small',
                            'secondary-large',
                        ],
                        rowLimit: [...ROW_LIMITS],
                    },
                    size: { width: 250, height: 100 },
                }),
            ],
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Typography',
                    subComponentName: 'Text',
                    knobs: {
                        children:
                            'Съешь ещё этих мягких французских булок, да выпей чаю. Съешь ещё этих мягких французских булок, да выпей чаю',
                        view: ['secondary-medium', 'secondary-small', 'component', 'caps'],
                        rowLimit: [...ROW_LIMITS],
                    },
                    size: { width: 250, height: 100 },
                }),
            ],
        ],
        viewport: { width: 1100, height: 100 },
        screenshotOpts: {
            fullPage: true,
        },
    }),
);
